(function () {
  "use strict";

  const DATA = window.PYTHON_QUIZ_DATA || [];
  const sourceLabels = { all: "전체", exam: "교재 문제", study: "암기 학습" };
  const chapterLabels = {
    "01": "01 준비",
    "02": "02 기초 문법",
    "03": "03 텍스트",
    "04": "04 CSV",
    "05": "05 데이터 분석"
  };

  const stage = document.getElementById("stage");
  const progressMeta = document.getElementById("progressMeta");
  const progressBar = document.getElementById("progressBar");
  const pageTools = document.getElementById("pageTools");
  const keyboardHelp = document.getElementById("keyboardHelp");
  const sourceFilters = document.getElementById("sourceFilters");
  const chapterFilters = document.getElementById("chapterFilters");
  const selectionSummary = document.getElementById("selectionSummary");

  const state = {
    mode: "practice",
    source: "all",
    chapter: "all",
    session: [],
    index: 0,
    selected: null,
    graded: false,
    results: new Map(),
    examAnswers: new Map(),
    submitted: false,
    warning: false,
    retryActive: false
  };

  function shuffled(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function filteredQuestions() {
    return DATA.filter((question) => {
      const sourceMatches = state.source === "all" || question.source === state.source;
      const chapterMatches = state.chapter === "all" || question.chapter === state.chapter;
      return sourceMatches && chapterMatches;
    });
  }

  function buildSession(questions) {
    return shuffled(questions).map((question) => ({
      question,
      optionOrder: shuffled(question.options.map((_, index) => index))
    }));
  }

  function startSession(questions = filteredQuestions(), retryActive = false) {
    state.session = buildSession(questions);
    state.index = 0;
    state.selected = null;
    state.graded = false;
    state.results = new Map();
    state.examAnswers = new Map();
    state.submitted = false;
    state.warning = false;
    state.retryActive = retryActive;
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function button(label, className, handler, disabled = false) {
    const element = node("button", className, label);
    element.type = "button";
    element.disabled = disabled;
    if (!disabled) element.addEventListener("click", handler);
    return element;
  }

  function sourceName(question) {
    return question.source === "exam" ? "교재 문제" : "암기 학습";
  }

  function renderFilters() {
    sourceFilters.replaceChildren();
    ["all", "exam", "study"].forEach((source) => {
      const count = DATA.filter((q) => source === "all" || q.source === source).length;
      const control = node("button", "chip");
      control.type = "button";
      control.dataset.source = source;
      control.setAttribute("aria-pressed", String(state.source === source));
      control.append(sourceLabels[source], node("span", "count", String(count)));
      control.addEventListener("click", () => {
        if (state.source === source) return;
        state.source = source;
        if (state.chapter !== "all" && !DATA.some((q) => (source === "all" || q.source === source) && q.chapter === state.chapter)) {
          state.chapter = "all";
        }
        startSession();
      });
      sourceFilters.appendChild(control);
    });

    chapterFilters.replaceChildren();
    const available = DATA.filter((q) => state.source === "all" || q.source === state.source);
    const chapters = [...new Set(available.map((q) => q.chapter))].sort();
    const chapterKeys = ["all", ...chapters];
    chapterKeys.forEach((chapter) => {
      const count = available.filter((q) => chapter === "all" || q.chapter === chapter).length;
      const control = node("button", "chip");
      control.type = "button";
      control.dataset.chapter = chapter;
      control.setAttribute("aria-pressed", String(state.chapter === chapter));
      control.append(chapter === "all" ? "전체 단원" : chapterLabels[chapter], node("span", "count", String(count)));
      control.addEventListener("click", () => {
        if (state.chapter === chapter) return;
        state.chapter = chapter;
        startSession();
      });
      chapterFilters.appendChild(control);
    });

    const selectedSource = sourceLabels[state.source];
    const selectedChapter = state.chapter === "all" ? "전체 단원" : chapterLabels[state.chapter];
    selectionSummary.textContent = `${selectedSource} · ${selectedChapter} · ${filteredQuestions().length}문항`;
  }

  function updateModeSwitch() {
    document.querySelectorAll("[data-mode]").forEach((control) => {
      control.setAttribute("aria-pressed", String(control.dataset.mode === state.mode));
    });
  }

  function currentEntry() {
    return state.session[state.index];
  }

  function practiceStats() {
    const values = [...state.results.values()];
    return {
      completed: values.length,
      correct: values.filter(Boolean).length,
      wrong: values.filter((value) => !value).length
    };
  }

  function examStats() {
    const answered = state.session.filter(({ question }) => state.examAnswers.has(question.id)).length;
    const correct = state.session.filter(({ question }) => state.examAnswers.get(question.id) === question.answer).length;
    return { answered, correct, wrong: answered - correct, skipped: state.session.length - answered };
  }

  function renderProgress() {
    const total = state.session.length;
    if (state.mode === "practice") {
      const stats = practiceStats();
      const position = Math.min(state.index + 1, total);
      progressMeta.replaceChildren(
        metric("문제", `${position} / ${total}`),
        metric("정답", stats.correct, "correct"),
        metric("오답", stats.wrong, "wrong"),
        node("span", "mode-note", state.retryActive ? "틀린 문제 다시 풀기" : "한 문제씩 바로 채점")
      );
      progressBar.style.width = `${total ? (stats.completed / total) * 100 : 0}%`;
    } else {
      const stats = examStats();
      const position = Math.min(state.index + 1, total);
      progressMeta.replaceChildren(
        metric(state.submitted ? "점수" : "문제", state.submitted ? `${stats.correct} / ${total}` : `${position} / ${total}`),
        metric("답한 문제", stats.answered),
        metric("남은 문제", stats.skipped),
        node("span", "mode-note", state.submitted ? "채점 완료" : "끝까지 푼 뒤 한 번에 채점")
      );
      progressBar.style.width = `${state.submitted ? 100 : total ? (stats.answered / total) * 100 : 0}%`;
    }
  }

  function metric(label, value, className = "") {
    const wrap = node("span", className);
    wrap.append(`${label} `, node("strong", "", String(value)));
    return wrap;
  }

  function renderQuestion() {
    const entry = currentEntry();
    const question = entry.question;
    const isPractice = state.mode === "practice";
    const showAnswer = isPractice ? state.graded : state.submitted;
    const selected = isPractice ? state.selected : state.examAnswers.get(question.id);

    const card = node("article", "question-card");
    const meta = node("div", "question-meta");
    meta.append(
      node("span", "badge", sourceName(question)),
      node("span", "badge subtle", chapterLabels[question.chapter]),
      node("span", "badge subtle", question.topic),
      node("span", "question-number", `${state.index + 1} / ${state.session.length}`)
    );
    card.appendChild(meta);
    card.appendChild(node("h2", "question-title", question.question));
    if (question.image) {
      const figure = node("figure", "question-figure");
      const image = node("img");
      image.src = question.image;
      image.alt = `${question.question}에 포함된 교재 그림`;
      figure.appendChild(image);
      card.appendChild(figure);
    }
    if (question.code) card.appendChild(node("pre", "code-block", question.code));

    const options = node("ol", "option-list");
    entry.optionOrder.forEach((originalIndex, displayIndex) => {
      const item = node("li");
      const control = node("button", "option");
      control.type = "button";
      control.setAttribute("aria-pressed", String(selected === originalIndex && !showAnswer));
      control.disabled = showAnswer;
      control.append(
        node("span", "option-key", String(displayIndex + 1)),
        node("span", "option-text", question.options[originalIndex])
      );
      if (showAnswer && originalIndex === question.answer) control.classList.add("correct-answer");
      if (showAnswer && selected === originalIndex && originalIndex !== question.answer) control.classList.add("wrong-answer");
      if (!showAnswer) control.addEventListener("click", () => selectOption(originalIndex));
      item.appendChild(control);
      options.appendChild(item);
    });
    card.appendChild(options);

    if (showAnswer) {
      const correct = selected === question.answer;
      const feedback = node("div", `feedback ${correct ? "correct" : "wrong"}`);
      feedback.append(
        node("strong", "", correct ? "정답입니다" : selected === undefined || selected === null ? "안 푼 문제입니다" : "오답입니다"),
        document.createTextNode(question.explanation)
      );
      card.appendChild(feedback);
    }

    const actions = node("div", "card-actions");
    if (isPractice) {
      if (state.graded) {
        actions.appendChild(button(state.index + 1 < state.session.length ? "다음 문제" : "결과 보기", "button primary push", nextPractice));
      } else {
        actions.appendChild(button("채점", "button primary push", gradePractice, state.selected === null));
      }
    } else {
      actions.appendChild(button("이전", "button", () => goExam(state.index - 1), state.index === 0));
      if (state.index + 1 < state.session.length) {
        actions.appendChild(button("다음 문제", "button primary push", () => goExam(state.index + 1)));
      } else if (!state.submitted) {
        actions.appendChild(button("제출하고 채점", "button primary push", () => submitExam(false)));
      } else {
        actions.appendChild(button("결과 보기", "button primary push", showExamResult));
      }
    }
    card.appendChild(actions);

    if (state.warning && !state.submitted) {
      const stats = examStats();
      const warning = node("div", "exam-warning");
      warning.appendChild(node("p", "", `아직 안 푼 문제가 ${stats.skipped}개 있습니다. 안 푼 문제는 오답으로 처리됩니다.`));
      const warningActions = node("div", "card-actions");
      warningActions.append(
        button("계속 풀기", "button", () => { state.warning = false; render(); }),
        button("그대로 제출", "button primary", () => submitExam(true))
      );
      warning.appendChild(warningActions);
      card.appendChild(warning);
    }

    stage.replaceChildren(card);
    if (state.mode === "exam") renderQuestionMap();
  }

  function selectOption(originalIndex) {
    if (state.mode === "practice") {
      if (state.graded) return;
      state.selected = originalIndex;
    } else {
      if (state.submitted) return;
      state.examAnswers.set(currentEntry().question.id, originalIndex);
      state.warning = false;
    }
    render();
  }

  function gradePractice() {
    if (state.selected === null || state.graded) return;
    const question = currentEntry().question;
    state.results.set(question.id, state.selected === question.answer);
    state.graded = true;
    render();
  }

  function nextPractice() {
    state.index += 1;
    state.selected = null;
    state.graded = false;
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function goExam(index) {
    if (index < 0 || index >= state.session.length) return;
    state.index = index;
    state.warning = false;
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function submitExam(force) {
    const stats = examStats();
    if (!force && stats.skipped > 0) {
      state.warning = true;
      render();
      document.querySelector(".exam-warning")?.scrollIntoView({ block: "center" });
      return;
    }
    state.submitted = true;
    state.warning = false;
    state.index = state.session.length;
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function showExamResult() {
    state.index = state.session.length;
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function renderQuestionMap() {
    const label = node("p", "question-map-label", state.submitted
      ? "문제 번호를 눌러 정답을 확인하세요."
      : "문제 번호를 눌러 바로 이동하세요.");
    const map = node("div", "question-map");
    state.session.forEach(({ question }, index) => {
      const control = button(String(index + 1), "", () => goExam(index));
      control.setAttribute("aria-label", `${index + 1}번 문제`);
      const answer = state.examAnswers.get(question.id);
      if (state.submitted && answer !== undefined) {
        control.classList.add(answer === question.answer ? "correct" : "wrong");
      } else if (answer !== undefined) {
        control.classList.add("answered");
      }
      if (index === state.index) control.classList.add("current");
      map.appendChild(control);
    });
    stage.append(label, map);
  }

  function wrongEntries() {
    if (state.mode === "practice") {
      return state.session.filter(({ question }) => state.results.get(question.id) === false);
    }
    return state.session.filter(({ question }) => state.examAnswers.get(question.id) !== question.answer);
  }

  function renderResult() {
    const total = state.session.length;
    const isPractice = state.mode === "practice";
    const stats = isPractice ? practiceStats() : examStats();
    const correct = stats.correct;
    const wrong = wrongEntries();
    const card = node("section", "result-card");
    card.append(
      node("h2", "", isPractice ? (state.retryActive ? "틀린 문제 다시 풀기 결과" : "연습 결과") : "시험 결과"),
      node("div", "score", `${correct} / ${total}`),
      node("p", "", wrong.length ? `다시 확인할 문제가 ${wrong.length}개 있습니다.` : "모든 문제를 맞혔습니다.")
    );
    if (!isPractice && stats.skipped) {
      card.appendChild(node("p", "", `안 푼 문제 ${stats.skipped}개는 오답으로 처리했습니다.`));
    }
    if (wrong.length) {
      const list = node("div", "wrong-list");
      state.session.forEach((entry, index) => {
        if (wrong.includes(entry)) list.appendChild(node("span", "", `${index + 1}번`));
      });
      card.appendChild(list);
    }
    const actions = node("div", "card-actions");
    if (!isPractice) {
      actions.appendChild(button("문제별 정답 확인", "button", () => {
        state.index = 0;
        render();
        window.scrollTo({ top: 0, behavior: "auto" });
      }));
    }
    if (wrong.length) {
      actions.appendChild(button("틀린 문제만 다시 풀기", "button primary", () => {
        state.mode = "practice";
        startSession(wrong.map((entry) => entry.question), true);
      }));
    }
    card.appendChild(actions);
    stage.replaceChildren(card);
  }

  function renderPageTools() {
    const label = state.mode === "practice" ? "현재 범위 다시 섞기" : "새 시험 시작";
    pageTools.replaceChildren(button(label, "button", () => startSession()));
    keyboardHelp.textContent = state.mode === "practice"
      ? "키보드: 숫자 키로 보기 선택 · Enter로 채점 또는 다음 문제"
      : "키보드: 숫자 키로 보기 선택 · ← →로 문제 이동";
  }

  function renderEmpty() {
    const card = node("section", "result-card");
    card.append(node("h2", "", "선택한 범위에 문제가 없습니다."), node("p", "", "다른 자료나 단원을 선택해 주세요."));
    stage.replaceChildren(card);
    progressMeta.replaceChildren();
    progressBar.style.width = "0%";
  }

  function render() {
    updateModeSwitch();
    renderFilters();
    renderPageTools();
    if (!state.session.length) {
      renderEmpty();
      return;
    }
    renderProgress();
    if (state.index >= state.session.length) renderResult();
    else renderQuestion();
  }

  document.querySelectorAll("[data-mode]").forEach((control) => {
    control.addEventListener("click", () => {
      const mode = control.dataset.mode;
      if (state.mode === mode) return;
      state.mode = mode;
      startSession();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || !state.session.length || state.index >= state.session.length) return;
    const active = document.activeElement;
    const onControl = active && active.tagName === "BUTTON" && !active.classList.contains("option");
    const entry = currentEntry();
    if (/^[1-9]$/.test(event.key)) {
      const displayIndex = Number(event.key) - 1;
      if (displayIndex < entry.optionOrder.length) {
        const locked = state.mode === "practice" ? state.graded : state.submitted;
        if (!locked) {
          event.preventDefault();
          selectOption(entry.optionOrder[displayIndex]);
        }
      }
      return;
    }
    if (state.mode === "practice" && event.key === "Enter" && !onControl) {
      event.preventDefault();
      state.graded ? nextPractice() : gradePractice();
    }
    if (state.mode === "exam" && event.key === "ArrowRight") {
      event.preventDefault();
      goExam(state.index + 1);
    }
    if (state.mode === "exam" && event.key === "ArrowLeft") {
      event.preventDefault();
      goExam(state.index - 1);
    }
  });

  if (!DATA.length) {
    render();
  } else {
    startSession();
  }
})();
