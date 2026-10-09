(function () {
  const exam = [
    {
      id: "exam-01-01", source: "exam", chapter: "01", topic: "멤버십 연산자",
      question: "3이 range(5)에 포함되는지 확인하려면 빈칸에 무엇을 넣어야 할까요?",
      code: ">>> if 3 ____ range(5):\n...     print('There is 3')",
      options: ["in", "is", "of", "at"], answer: 0,
      explanation: "in은 값이 시퀀스에 포함되어 있는지 확인하는 멤버십 연산자입니다."
    },
    {
      id: "exam-01-02", source: "exam", chapter: "01", topic: "range",
      question: "다음 반복문을 실행했을 때 마지막으로 출력되는 숫자는 무엇일까요?",
      code: ">>> for i in range(10):\n...     print(i)",
      options: ["8", "9", "10", "11"], answer: 1,
      explanation: "range(10)은 0부터 9까지의 정수를 만듭니다."
    },
    {
      id: "exam-01-03", source: "exam", chapter: "01", topic: "프로그램 실행",
      question: "노트패드++에서 코드를 입력한 뒤 NppExec로 실행하기 전에 해야 하는 단계는 무엇일까요?",
      image: "assets/python/exam-01-03-flowchart.png",
      options: ["확장자 .py로 파일 저장", "컴퓨터 다시 시작", "코드를 PDF로 변환", "명령 프롬프트 종료"], answer: 0,
      explanation: "파이썬 프로그램은 먼저 .py 확장자로 저장한 뒤 실행합니다."
    },
    {
      id: "exam-02-01", source: "exam", chapter: "02", topic: "나머지 연산",
      question: "다음 식의 결괏값은 무엇일까요?",
      code: ">>> 14 % 4",
      options: ["2", "3", "3.5", "4"], answer: 0,
      explanation: "14를 4로 나눈 나머지는 2입니다."
    },
    {
      id: "exam-02-02", source: "exam", chapter: "02", topic: "round",
      question: "다음 명령의 출력 결과는 무엇일까요?",
      code: ">>> round(1.34567, 2)",
      options: ["1.34", "1.35", "1.346", "2"], answer: 1,
      explanation: "소수점 셋째 자리에서 반올림하여 1.35가 됩니다."
    },
    {
      id: "exam-02-03", source: "exam", chapter: "02", topic: "형 변환",
      question: "input()으로 입력받은 나이 a를 40에서 빼려면 어떻게 수정해야 할까요?",
      code: ">>> a = input('나이를 입력하세요: ')\n나이를 입력하세요: 38\n>>> 40 - a",
      options: ["40 - int(a)", "40 - str(a)", "40 - input(a)", "40 - type(a)"], answer: 0,
      explanation: "input()의 결과는 문자열이므로 int(a) 또는 float(a)로 숫자형 변환이 필요합니다."
    },
    {
      id: "exam-02-04", source: "exam", chapter: "02", topic: "lambda",
      question: "plus() 함수로 34와 54를 더하는 올바른 호출은 무엇일까요?",
      code: ">>> plus = lambda x, y: x + y",
      options: ["plus(34, 54)", "plus[34, 54]", "lambda(34, 54)", "plus = 34 + 54"], answer: 0,
      explanation: "함수 이름 뒤의 괄호에 두 인수를 전달합니다."
    },
    {
      id: "exam-02-05", source: "exam", chapter: "02", topic: "return",
      question: "mean()의 결과를 다른 연산에 사용하려면 함수 본문을 어떻게 바꿔야 할까요?",
      code: ">>> def mean(a, b):\n...     print((a + b) / 2)\n>>> 45 + mean(33, 22)",
      options: ["return (a + b) / 2", "print(return a + b)", "input((a + b) / 2)", "mean = (a + b) / 2"], answer: 0,
      explanation: "print()는 화면에 표시만 하고 None을 반환합니다. 계산에 쓰려면 return으로 값을 반환해야 합니다."
    },
    {
      id: "exam-02-06", source: "exam", chapter: "02", topic: "조건문",
      question: "10 미만은 그대로, 10 이상은 10을 빼서 출력하려면 빈칸에 어떤 키워드가 들어갈까요?",
      code: ">>> for i in [1, 2, 3, 10, 11, 12]:\n...     if i < 10:\n...         print(i)\n...     ______:\n...         print(i - 10)",
      options: ["else", "then", "except", "finally"], answer: 0,
      explanation: "if 조건이 거짓일 때 수행할 블록은 else로 작성합니다."
    },
    {
      id: "exam-03-01", source: "exam", chapter: "03", topic: "정규표현식",
      question: "re.match()로 찾은 실제 문자열을 출력하려면 빈칸에 무엇을 넣어야 할까요?",
      code: ">>> m = re.match(r'a\\D+', i)\n>>> if m:\n...     print(__________)",
      options: ["m.group()", "m.find()", "m.value", "m.text()"], answer: 0,
      explanation: "Match 객체의 group() 메서드는 일치한 문자열을 반환합니다."
    },
    {
      id: "exam-03-02", source: "exam", chapter: "03", topic: "이메일 추출",
      question: "문자열에서 이메일 주소를 모두 리스트로 추출하는 빈칸 조합은 무엇일까요?",
      code: ">>> b = re.①(r'[a-z]+@②+', a)",
      options: ["① findall, ② [a-z.]", "① search, ② [0-9]", "① split, ② \\d", "① sub, ② \\s"], answer: 0,
      explanation: "findall은 모든 일치 항목을 리스트로 반환하고 [a-z.]은 영문 소문자와 마침표에 대응합니다."
    },
    {
      id: "exam-03-03", source: "exam", chapter: "03", topic: "비탐욕 검색",
      question: "여러 연도를 각각 분리해 추출하도록 수정한 정규식은 무엇일까요?",
      code: ">>> exam = '저는 92년에 태어났습니다. 88년에는 올림픽이 있었습니다. 지금은 2020년입니다.'",
      options: ["r'\\d.+?년'", "r'\\d.+년'", "r'\\D.+년'", "r'^년$'"], answer: 0,
      explanation: ".+?는 가능한 짧게 일치하는 비탐욕 검색입니다. r'\\d+년'도 사용할 수 있습니다."
    },
    {
      id: "exam-03-04", source: "exam", chapter: "03", topic: "문장 분리",
      question: "마침표를 기준으로 문장을 나누는 빈칸 조합은 무엇일까요?",
      code: ">>> re.①(②, d)",
      options: ["① split, ② r'\\.'", "① findall, ② r'\\d'", "① match, ② r'\\s'", "① sub, ② r'+'"], answer: 0,
      explanation: "re.split()은 패턴을 기준으로 문자열을 나누며 마침표는 r'\\.'로 표현합니다."
    },
    {
      id: "exam-03-05", source: "exam", chapter: "03", topic: "중복 제거",
      question: "대사에서 영문 인물 이름을 찾고 중복을 제거하는 빈칸 조합은 무엇일까요?",
      code: ">>> m = re.findall('[①]+:', e)\n>>> M = list(②(m))",
      options: ["① A-Za-z, ② set", "① 0-9, ② tuple", "① 가-힣, ② sort", "① \\d, ② dict"], answer: 0,
      explanation: "[A-Za-z]로 영문자를 찾고 set()으로 중복값을 제거합니다."
    },
    {
      id: "exam-04-01", source: "exam", chapter: "04", topic: "Windows 경로",
      question: "Windows 경로의 역슬래시 때문에 발생하는 unicodeescape 오류를 해결하는 방법은 무엇일까요?",
      code: ">>> os.chdir('C:\\Users\\python')",
      options: ["r'C:\\Users\\python'처럼 원시 문자열을 사용한다", "경로 앞에 f만 붙인다", "역슬래시를 모두 지운다", "경로를 int()로 변환한다"], answer: 0,
      explanation: "경로 앞에 r을 붙이거나 역슬래시를 두 번씩 작성하면 됩니다."
    },
    {
      id: "exam-04-02", source: "exam", chapter: "04", topic: "CSV형 리스트",
      question: "첫 행이 컴퓨터·노트북·태블릿이고 둘째 행이 100·80·60인 CSV형 리스트는 무엇일까요?",
      options: ["[['컴퓨터', '노트북', '태블릿'], [100, 80, 60]]", "['컴퓨터', 100, '노트북', 80, '태블릿', 60]", "{'컴퓨터': 100, '노트북': 80, '태블릿': 60}", "[('컴퓨터', 100), ('노트북', 80), ('태블릿', 60)]"], answer: 0,
      explanation: "CSV형 리스트는 각 행을 내부 리스트로 갖는 중첩 리스트입니다."
    },
    {
      id: "exam-04-03", source: "exam", chapter: "04", topic: "문자 숫자 변환",
      question: "쉼표가 포함된 숫자 문자열을 정수로 바꾸는 빈칸 조합은 무엇일까요?",
      code: ">>> total[total.①(i)] = ②(re.sub(',', '', i))",
      options: ["① index, ② int", "① append, ② str", "① find, ② list", "① count, ② float64"], answer: 0,
      explanation: "index()로 원소 위치를 찾고 쉼표를 제거한 문자열을 int()로 변환합니다."
    },
    {
      id: "exam-04-04", source: "exam", chapter: "04", topic: "중첩 리스트 조건",
      question: "각 지역의 인구가 30만 명 미만인지 검사하도록 조건식을 바르게 수정한 것은 무엇일까요?",
      code: ">>> for i in pop:\n...     if pop[1] < 300000:\n...         print(i[0])",
      options: ["if i[1] < 300000:", "if pop[i] < 300000:", "if i[0] < 300000:", "if pop < i[1]:"], answer: 0,
      explanation: "반복 중인 한 행은 i이며, 인구 값은 그 행의 두 번째 원소 i[1]입니다."
    },
    {
      id: "exam-05-01", source: "exam", chapter: "05", topic: "NumPy 배열",
      question: "2행 4열 NumPy 배열을 올바르게 만드는 코드는 무엇일까요?",
      code: ">>> import numpy as np",
      options: ["np.array([[1, 2, 3, 4], [3, 4, 5, 6]])", "np.array([1, 2, 3, 4], [3, 4, 5, 6])", "np.array(1, 2, 3, 4, 3, 4, 5, 6)", "np.array{[1, 2, 3, 4], [3, 4, 5, 6]}"], answer: 0,
      explanation: "여러 행을 가진 배열은 각 행 리스트를 다시 하나의 리스트 안에 넣어 전달합니다."
    },
    {
      id: "exam-05-02", source: "exam", chapter: "05", topic: "배열 생성",
      question: "2×3 크기의 0 배열과 1 배열을 만드는 함수 조합은 무엇일까요?",
      options: ["np.zeros((2, 3)), np.ones((2, 3))", "np.zero(2, 3), np.one(2, 3)", "np.empty(0, 1), np.full(2, 3)", "np.array(0), np.array(1)"], answer: 0,
      explanation: "zeros()와 ones()에 배열 모양을 튜플로 전달합니다."
    },
    {
      id: "exam-05-03", source: "exam", chapter: "05", topic: "원소별 곱셈",
      question: "두 배열을 원소별로 곱했을 때 빈칸에 들어갈 값은 무엇일까요?",
      code: ">>> a = np.array([[1, 2], [4, 5]])\n>>> b = np.array([[1, 2], [1, 3]])\n>>> a * b\narray([[1, 4],\n       [4, __]])",
      options: ["8", "10", "15", "20"], answer: 2,
      explanation: "마지막 원소는 5 × 3이므로 15입니다."
    },
    {
      id: "exam-05-04", source: "exam", chapter: "05", topic: "전치",
      question: "NumPy에서 배열의 행과 열을 바꾸는 함수 이름은 무엇일까요?",
      options: ["transpose", "reshape_only", "reverse", "switchrow"], answer: 0,
      explanation: "transpose()는 배열의 축을 바꾸며 2차원 배열에서는 행과 열을 전환합니다."
    },
    {
      id: "exam-05-05", source: "exam", chapter: "05", topic: "내부수익률",
      question: "현금 흐름 cf의 내부수익률을 구하는 명령은 무엇일까요?",
      options: ["npf.irr(cf)", "npf.npv(cf)", "np.irr(0.055)", "npf.rate(cf)"], answer: 0,
      explanation: "numpy_financial의 irr() 함수로 내부수익률을 계산합니다."
    },
    {
      id: "exam-05-06", source: "exam", chapter: "05", topic: "순현재가치",
      question: "할인율이 5.5%일 때 현금 흐름 cf의 순현재가치를 구하는 명령은 무엇일까요?",
      options: ["npf.npv(0.055, cf)", "npf.irr(0.055, cf)", "np.npv(cf, 5.5)", "npf.npv(5.5, cf)"], answer: 0,
      explanation: "npf.npv()의 첫 인수에는 소수로 표현한 할인율 0.055를 전달합니다."
    },
    {
      id: "exam-05-07", source: "exam", chapter: "05", topic: "Pandas 요약 함수",
      question: "평균, 합, 기초 통계량을 구하는 메서드의 올바른 조합은 무엇일까요?",
      options: ["mean(), sum(), describe()", "avg(), total(), info()", "mean(), add(), summary()", "average(), sum(), stats()"], answer: 0,
      explanation: "Pandas Series의 평균은 mean(), 합은 sum(), 요약 통계는 describe()로 구합니다."
    },
    {
      id: "exam-05-08", source: "exam", chapter: "05", topic: "조건 필터링",
      question: "나이가 40보다 많고 점수가 80보다 높은 사람의 이름만 고르는 코드는 무엇일까요?",
      options: ["df['name'][(df['age'] > 40) & (df['score'] > 80)]", "df[(age > 40) or (score > 80)]", "df['name'][df['age' > 40]]", "df.filter('name', age=40, score=80)"], answer: 0,
      explanation: "각 조건을 괄호로 묶고 & 연산자로 결합한 뒤 name 열을 선택합니다."
    },
    {
      id: "exam-05-09", source: "exam", chapter: "05", topic: "정렬",
      question: "점수를 기준으로 내림차순 정렬하는 빈칸은 무엇일까요?",
      code: ">>> df.sort_values(__________, ascending=False)",
      options: ["by='score'", "key='age'", "column='name'", "order='score'"], answer: 0,
      explanation: "sort_values()의 by 인수에 정렬 기준 열 이름을 전달합니다."
    },
    {
      id: "exam-05-10", source: "exam", chapter: "05", topic: "문자열 조건",
      question: "이름에 a가 들어간 행만 선택하는 빈칸 조합은 무엇일까요?",
      code: ">>> df[df['name'].①.②('a')]",
      options: ["① str, ② contains", "① text, ② find", "① string, ② matchall", "① name, ② search"], answer: 0,
      explanation: "문자열 접근자 str 뒤에 contains()를 사용하면 포함 여부를 불리언 값으로 얻습니다."
    },
    {
      id: "exam-05-11", source: "exam", chapter: "05", topic: "상관관계",
      question: "age와 score 두 열 사이의 상관관계를 구하려면 빈칸에 무엇을 넣어야 할까요?",
      code: ">>> df__________.corr()",
      options: ["[['age', 'score']]", "['age', 'score']", ".age.score", "(age & score)"], answer: 0,
      explanation: "두 열을 데이터프레임으로 선택하려면 열 이름 리스트를 이중 대괄호 안에 넣습니다."
    }
  ];

  const study = [
    { id: "study-02-01", source: "study", chapter: "02", topic: "연산자", question: "나눗셈의 몫만 구하는 연산자는 무엇일까요?", options: ["//", "/", "%", "**"], answer: 0, explanation: "//는 나눗셈의 몫을 반환합니다. 11 // 2는 5입니다." },
    { id: "study-02-02", source: "study", chapter: "02", topic: "연산자", question: "나눗셈의 나머지를 구하는 연산자는 무엇일까요?", options: ["%", "//", "/", "+"], answer: 0, explanation: "%는 나머지 연산자입니다. 8 % 5는 3입니다." },
    { id: "study-02-03", source: "study", chapter: "02", topic: "연산자", question: "2의 4제곱을 파이썬으로 올바르게 표현한 것은 무엇일까요?", options: ["2 ** 4", "2 ^ 4", "2 * 4", "pow ** (2, 4)"], answer: 0, explanation: "**는 제곱 연산자입니다." },
    { id: "study-02-04", source: "study", chapter: "02", topic: "입력", question: "input()으로 입력받은 값의 기본 자료형은 무엇일까요?", options: ["str", "int", "float", "list"], answer: 0, explanation: "input()의 반환값은 항상 문자열입니다. 계산하려면 int()나 float()로 변환합니다." },
    { id: "study-02-05", source: "study", chapter: "02", topic: "range", question: "range(2, 20)이 만드는 정수 범위는 무엇일까요?", options: ["2부터 19까지", "2부터 20까지", "1부터 19까지", "0부터 20까지"], answer: 0, explanation: "range()의 끝값은 범위에 포함되지 않습니다." },
    { id: "study-02-06", source: "study", chapter: "02", topic: "문자열 포매팅", question: "변수 item을 문자열 안에 직접 넣는 f문자열 형식은 무엇일까요?", options: ["f'{item}'", "'{f:item}'", "format'{item}'", "$'{item}'"], answer: 0, explanation: "문자열 앞에 f를 붙이고 중괄호 안에 변수나 식을 작성합니다." },
    { id: "study-02-07", source: "study", chapter: "02", topic: "예외 처리", question: "예외 발생 여부와 관계없이 항상 실행되는 블록은 무엇일까요?", options: ["finally", "except", "try", "else if"], answer: 0, explanation: "finally 블록은 예외 발생 여부와 관계없이 실행됩니다." },
    { id: "study-02-08", source: "study", chapter: "02", topic: "오류 종류", question: "정수와 문자열을 더할 때 주로 발생하는 오류는 무엇일까요?", code: ">>> 1 + 'hello'", options: ["TypeError", "NameError", "KeyError", "ImportError"], answer: 0, explanation: "서로 맞지 않는 자료형을 연산하면 TypeError가 발생합니다." },
    { id: "study-02-09", source: "study", chapter: "02", topic: "오류 종류", question: "int('hello')처럼 형식에 맞지 않는 값을 변환할 때 발생하는 오류는 무엇일까요?", options: ["ValueError", "IndexError", "SyntaxError", "AttributeError"], answer: 0, explanation: "자료형은 맞지만 값이 연산에 적절하지 않을 때 ValueError가 발생합니다." },
    { id: "study-02-10", source: "study", chapter: "02", topic: "오류 종류", question: "리스트 범위를 벗어난 위치에 접근할 때 발생하는 오류는 무엇일까요?", code: ">>> [1, 2, 3][3]", options: ["IndexError", "KeyError", "NameError", "ZeroDivisionError"], answer: 0, explanation: "존재하지 않는 리스트 인덱스에 접근하면 IndexError가 발생합니다." },
    { id: "study-02-11", source: "study", chapter: "02", topic: "오류 종류", question: "딕셔너리에 없는 키로 접근할 때 발생하는 오류는 무엇일까요?", options: ["KeyError", "IndexError", "TypeError", "ImportError"], answer: 0, explanation: "딕셔너리에 존재하지 않는 키를 조회하면 KeyError가 발생합니다." },
    { id: "study-02-12", source: "study", chapter: "02", topic: "lambda", question: "lambda 함수에 대한 설명으로 올바른 것은 무엇일까요?", options: ["짧은 함수를 한 줄로 표현할 수 있다", "여러 줄 함수만 만들 수 있다", "항상 값을 출력하지만 반환하지 않는다", "파일을 자동으로 닫는다"], answer: 0, explanation: "lambda는 짧은 함수를 한 줄로 만들 때 사용합니다. 복잡한 함수는 def가 더 읽기 쉽습니다." },
    { id: "study-02-13", source: "study", chapter: "02", topic: "함수", question: "함수의 결괏값을 호출한 곳으로 돌려주는 키워드는 무엇일까요?", options: ["return", "print", "yield from file", "input"], answer: 0, explanation: "return은 값을 반환합니다. print()만 사용하면 반환값은 None입니다." },
    { id: "study-02-14", source: "study", chapter: "02", topic: "조건문", question: "정수 a가 짝수인지 확인하는 조건식은 무엇일까요?", options: ["a % 2 == 0", "a / 2 == 0", "a // 2 == 0", "a % 2 == 1"], answer: 0, explanation: "2로 나눈 나머지가 0이면 짝수입니다." },

    { id: "study-03-01", source: "study", chapter: "03", topic: "os 모듈", question: "현재 작업 폴더의 경로를 확인하는 함수는 무엇일까요?", options: ["os.getcwd()", "os.chdir()", "os.listdir()", "os.path()"], answer: 0, explanation: "os.getcwd()는 현재 작업 디렉터리를 반환합니다." },
    { id: "study-03-02", source: "study", chapter: "03", topic: "os 모듈", question: "현재 작업 폴더를 다른 경로로 변경하는 함수는 무엇일까요?", options: ["os.chdir(경로)", "os.getcwd(경로)", "os.listdir(경로)", "os.move(경로)"], answer: 0, explanation: "os.chdir()에 이동할 경로를 전달합니다." },
    { id: "study-03-03", source: "study", chapter: "03", topic: "os 모듈", question: "폴더 안의 파일 목록을 리스트로 얻는 함수는 무엇일까요?", options: ["os.listdir()", "os.getcwd()", "os.chdir()", "os.read()"], answer: 0, explanation: "os.listdir()은 지정한 폴더의 항목 이름을 리스트로 반환합니다." },
    { id: "study-03-04", source: "study", chapter: "03", topic: "파일 모드", question: "기존 파일 내용을 지우고 새로 쓰는 파일 모드는 무엇일까요?", options: ["'w'", "'r'", "'a'", "'x+'"], answer: 0, explanation: "'w' 모드는 쓰기 모드이며 기존 내용은 지워집니다." },
    { id: "study-03-05", source: "study", chapter: "03", topic: "파일 모드", question: "기존 내용 뒤에 이어서 쓰는 파일 모드는 무엇일까요?", options: ["'a'", "'w'", "'r'", "'n'"], answer: 0, explanation: "'a'는 append의 약자로 기존 파일 끝에 내용을 추가합니다." },
    { id: "study-03-06", source: "study", chapter: "03", topic: "파일 처리", question: "파일을 사용한 뒤 자동으로 닫아 주는 문법은 무엇일까요?", options: ["with open(...) as f:", "auto open(...) as f:", "try file(...) as f:", "using open(...) as f:"], answer: 0, explanation: "with 문을 사용하면 블록을 벗어날 때 파일이 자동으로 닫힙니다." },
    { id: "study-03-07", source: "study", chapter: "03", topic: "파일 처리", question: "파일 커서를 맨 앞으로 이동해 다시 읽게 하는 명령은 무엇일까요?", options: ["f.seek(0)", "f.read(0)", "f.reset()", "f.position(0)"], answer: 0, explanation: "seek(0)은 파일 커서를 시작 위치로 옮깁니다." },
    { id: "study-03-08", source: "study", chapter: "03", topic: "파일 처리", question: "파일의 모든 줄을 각각 리스트 원소로 읽는 메서드는 무엇일까요?", options: ["readlines()", "read()", "writelines()", "lines()"], answer: 0, explanation: "readlines()는 각 줄을 원소로 하는 리스트를 반환합니다." },
    { id: "study-03-09", source: "study", chapter: "03", topic: "정규표현식", question: "문자열의 시작 위치부터 패턴이 맞는지 검사하는 함수는 무엇일까요?", options: ["re.match()", "re.search()", "re.findall()", "re.split()"], answer: 0, explanation: "re.match()는 문자열 시작부터 패턴 일치 여부를 확인합니다." },
    { id: "study-03-10", source: "study", chapter: "03", topic: "정규표현식", question: "문자열 중간을 포함해 전체에서 첫 패턴을 찾는 함수는 무엇일까요?", options: ["re.search()", "re.match()", "re.sub()", "re.compile()"], answer: 0, explanation: "re.search()는 문자열 전체를 검색합니다." },
    { id: "study-03-11", source: "study", chapter: "03", topic: "정규표현식", question: "패턴과 일치하는 모든 문자열을 리스트로 반환하는 함수는 무엇일까요?", options: ["re.findall()", "re.search()", "re.group()", "re.replace()"], answer: 0, explanation: "re.findall()은 모든 일치 항목을 리스트로 반환합니다." },
    { id: "study-03-12", source: "study", chapter: "03", topic: "정규표현식", question: "패턴이 나올 때마다 문자열을 나누는 함수는 무엇일까요?", options: ["re.split()", "re.sub()", "re.match()", "re.compile()"], answer: 0, explanation: "re.split()은 지정한 패턴을 구분자로 사용합니다." },
    { id: "study-03-13", source: "study", chapter: "03", topic: "정규표현식", question: "찾은 패턴을 다른 문자열로 바꾸는 함수는 무엇일까요?", options: ["re.sub()", "re.findall()", "re.search()", "re.group()"], answer: 0, explanation: "re.sub(패턴, 대체 문자열, 원본 문자열) 형식으로 사용합니다." },
    { id: "study-03-14", source: "study", chapter: "03", topic: "정규표현식", question: "정규식에서 숫자 한 글자와 일치하는 기호는 무엇일까요?", options: ["\\d", "\\D", "\\s", "\\W"], answer: 0, explanation: "\\d는 숫자와 일치하며 [0-9]와 같은 의미입니다." },
    { id: "study-03-15", source: "study", chapter: "03", topic: "정규표현식", question: "탐욕적인 .+를 가능한 짧게 일치하도록 바꾸는 표현은 무엇일까요?", options: [".+?", ".++", "?.+", ".*+"], answer: 0, explanation: ".+ 뒤에 ?를 붙이면 비탐욕 방식으로 검색합니다." },
    { id: "study-03-16", source: "study", chapter: "03", topic: "집합", question: "리스트의 중복값을 제거할 때 사용할 수 있는 함수는 무엇일까요?", options: ["set()", "replace()", "group()", "seek()"], answer: 0, explanation: "set()은 중복되지 않는 집합을 만듭니다. 필요하면 list(set(...))으로 다시 리스트로 변환합니다." },

    { id: "study-04-01", source: "study", chapter: "04", topic: "CSV", question: "CSV의 영문 전체 이름은 무엇일까요?", options: ["Comma Separated Value", "Column Sorted Variable", "Code Saved View", "Common String Vector"], answer: 0, explanation: "CSV는 쉼표로 구분된 값을 저장하는 형식입니다." },
    { id: "study-04-02", source: "study", chapter: "04", topic: "CSV", question: "CSV형 리스트의 구조를 올바르게 설명한 것은 무엇일까요?", options: ["각 행을 내부 리스트로 갖는 중첩 리스트", "모든 값을 하나의 문자열로 연결한 구조", "열마다 별도 파일을 만드는 구조", "숫자만 저장할 수 있는 튜플"], answer: 0, explanation: "CSV형 리스트는 [[1행], [2행], ...] 형태입니다." },
    { id: "study-04-03", source: "study", chapter: "04", topic: "csv 모듈", question: "열린 CSV 파일을 읽는 reader 객체를 만드는 함수는 무엇일까요?", options: ["csv.reader()", "csv.writer()", "csv.readlines()", "csv.open()"], answer: 0, explanation: "csv.reader(f)는 파일을 행 단위 리스트로 읽을 수 있는 객체를 만듭니다." },
    { id: "study-04-04", source: "study", chapter: "04", topic: "csv 모듈", question: "CSV 파일에 쓰는 writer 객체를 만드는 함수는 무엇일까요?", options: ["csv.writer()", "csv.reader()", "csv.writefile()", "csv.append()"], answer: 0, explanation: "csv.writer(f, delimiter=',') 형식으로 writer 객체를 만듭니다." },
    { id: "study-04-05", source: "study", chapter: "04", topic: "csv 모듈", question: "CSV형 리스트의 여러 행을 한꺼번에 저장하는 메서드는 무엇일까요?", options: ["writerows()", "writelines()", "writeall()", "appendrows()"], answer: 0, explanation: "writerows()는 행 리스트들을 CSV 파일에 한꺼번에 씁니다." },
    { id: "study-04-06", source: "study", chapter: "04", topic: "인코딩", question: "엑셀에서 CSV의 한글이 깨지는 문제를 줄이기 위해 권장된 인코딩은 무엇일까요?", options: ["utf-8-sig", "ascii", "utf-16-be", "latin-1"], answer: 0, explanation: "자료에서는 CSV 쓰기 시 encoding='utf-8-sig' 사용을 권장합니다." },
    { id: "study-04-07", source: "study", chapter: "04", topic: "파일 쓰기", question: "Windows에서 CSV를 쓸 때 빈 줄이 추가되는 문제를 막는 open() 인수는 무엇일까요?", options: ["newline=''", "linebreak=False", "emptyline=0", "rows='compact'"], answer: 0, explanation: "CSV 파일 쓰기에서는 newline=''를 지정합니다." },
    { id: "study-04-08", source: "study", chapter: "04", topic: "사용자 함수", question: "학습 자료의 opencsv() 함수가 반환하는 것은 무엇일까요?", options: ["CSV형 리스트", "파일 경로 문자열", "writer 객체", "정규식 객체"], answer: 0, explanation: "opencsv()는 CSV의 각 행을 리스트에 추가한 뒤 중첩 리스트를 반환합니다." },
    { id: "study-04-09", source: "study", chapter: "04", topic: "사용자 함수", question: "학습 자료의 switch() 함수의 주된 역할은 무엇일까요?", options: ["숫자로 바꿀 수 있는 문자열 원소를 실수형으로 변환", "행과 열을 전치", "CSV 파일을 삭제", "중복 행을 모두 제거"], answer: 0, explanation: "switch()는 쉼표를 제거하고 변환 가능한 값을 float로 바꿉니다." },
    { id: "study-04-10", source: "study", chapter: "04", topic: "문자 숫자 변환", question: "문자열 '152,212'를 실수 152212.0으로 바꾸는 올바른 코드는 무엇일까요?", options: ["float('152,212'.replace(',', ''))", "float('152,212')", "int('152,212')", "'152,212'.float()"], answer: 0, explanation: "먼저 replace()로 쉼표를 제거한 뒤 float()로 변환합니다." },
    { id: "study-04-11", source: "study", chapter: "04", topic: "리스트", question: "리스트에서 특정 원소의 위치를 반환하는 메서드는 무엇일까요?", options: ["index()", "len()", "range()", "seek()"], answer: 0, explanation: "index(값)는 해당 값이 처음 나타나는 위치를 반환합니다." },
    { id: "study-04-12", source: "study", chapter: "04", topic: "반복", question: "두 리스트의 같은 위치 원소를 순서대로 처리할 때 사용할 수 있는 반복 범위는 무엇일까요?", options: ["range(len(리스트))", "range(리스트)", "len(range)", "index(range(리스트))"], answer: 0, explanation: "range(len(리스트))는 0부터 마지막 인덱스까지 반복합니다." }
  ];

  window.PYTHON_QUIZ_DATA = Object.freeze([...exam, ...study]);
})();
