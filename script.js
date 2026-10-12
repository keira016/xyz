document.addEventListener("DOMContentLoaded", function () {
    // Screens
    const homeScreen = document.querySelector(".home-screen");
    const languageScreen = document.getElementById("languageScreen");
    const pythonScreen = document.getElementById("pythonScreen");
    const cScreen = document.getElementById("cScreen");
    const cppScreen = document.getElementById("cppScreen");
    const javaScreen = document.getElementById("javaScreen");
    const lessonScreen = document.getElementById("lessonScreen");
    const achievementScreen = document.getElementById("achievementScreen");

    const worldScreens = {
        Python: pythonScreen,
        C: cScreen,
        CPP: cppScreen,
        Java: javaScreen
    };

    // Buttons & Elements
    const startButton = document.getElementById("startButton");
    const backButton = document.getElementById("backButton");
    const languageCards = document.querySelectorAll(".language-card");
    const worldBackButtons = document.querySelectorAll(".world-back");
    const levelButtons = document.querySelectorAll(".level-button[data-language]");

    // Lesson Elements
    const lessonTitle = document.getElementById("lessonTitle");
    const lessonTopic = document.getElementById("lessonTopic");
    const lessonText = document.getElementById("lessonText");
    const lessonCode = document.getElementById("lessonCode");
    const lessonExplanation = document.getElementById("lessonExplanation");
    const completeLessonButton = document.getElementById("completeLessonButton");
    const lessonBackButton = document.getElementById("lessonBackButton");

    // Quiz & Achievement Elements
    const quizBox = document.getElementById("quizBox");
    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.querySelectorAll(".quiz-option");
    let quizFeedback = document.getElementById("quizFeedback");
    let xpDisplay = document.getElementById("xpDisplay");
    let nextLevelButton = document.getElementById("nextLevelButton");
    const achievementXP = document.getElementById("achievementXP");
    const achievementBackButton = document.getElementById("achievementBackButton");

    // State & Local Storage
    let totalXP = Number(localStorage.getItem("codequestXP")) || 0;
    let currentLanguage = "Python";
    let currentLevel = "1";
    let answeredCorrectly = false;

    // AUTO-FIX: Ensure quizFeedback, xpGainBanner, xpDisplay, and nextLevelButton sit inside #quizBox
    let xpGainBanner = document.getElementById("xpGainBanner");
    if (quizBox) {
        if (!quizFeedback) {
            quizFeedback = document.createElement("p");
            quizFeedback.id = "quizFeedback";
        }
        if (!xpGainBanner) {
            xpGainBanner = document.createElement("div");
            xpGainBanner.id = "xpGainBanner";
            xpGainBanner.className = "xp-gain-banner";
            xpGainBanner.hidden = true;
        }
        if (!xpDisplay) {
            xpDisplay = document.createElement("p");
            xpDisplay.id = "xpDisplay";
        }
        if (!nextLevelButton) {
            nextLevelButton = document.createElement("button");
            nextLevelButton.id = "nextLevelButton";
            nextLevelButton.className = "level-button";
            nextLevelButton.type = "button";
        }

        const backBtnInQuiz = quizBox.querySelector(".back-button");
        [quizFeedback, xpGainBanner, xpDisplay, nextLevelButton].forEach(function (el) {
            if (backBtnInQuiz) {
                quizBox.insertBefore(el, backBtnInQuiz);
            } else {
                quizBox.appendChild(el);
            }
        });
    }

    // Complete 40-Level Curriculum (Python, C, C++, and Java)
    const contentData = {
        Python: {
            "1": {
                title: "🐍 PYTHON LEVEL 1: CODING CAMP",
                topic: "Displaying Output in Python",
                text: "Programming means giving instructions to a computer so it knows what to do.",
                code: 'print("Hello, Jungle Explorer!")',
                explanation: "In Python, print() is used to display text or numbers on the screen.",
                question: "What is the purpose of print() in Python?",
                options: [
                    { text: "To calculate numbers", answer: "wrong" },
                    { text: "To display output", answer: "correct" },
                    { text: "To stop the program", answer: "wrong" }
                ]
            },
            "2": {
                title: "🐍 PYTHON LEVEL 2: VARIABLE VALLEY",
                topic: "Variables & Data Types",
                text: "Variables are like storage boxes that hold data such as numbers or text in your program.",
                code: 'player_score = 100\nprint(player_score)',
                explanation: "In Python, you create a variable by giving it a name and using = to assign a value.",
                question: "Which symbol assigns a value to a variable in Python?",
                options: [
                    { text: "==", answer: "wrong" },
                    { text: "=", answer: "correct" },
                    { text: "->", answer: "wrong" }
                ]
            },
            "3": {
                title: "🐍 PYTHON LEVEL 3: ECHO CANYON",
                topic: "Taking User Input",
                text: "Interactive programs can ask the player for information while the program is running.",
                code: 'hero_name = input("Enter name: ")\nprint("Welcome, " + hero_name)',
                explanation: "The input() function pauses the program, waits for the user to type text, and returns it as a string.",
                question: "Which function reads text typed by the user in Python?",
                options: [
                    { text: "scanf()", answer: "wrong" },
                    { text: "input()", answer: "correct" },
                    { text: "read()", answer: "wrong" }
                ]
            },
            "4": {
                title: "🐍 PYTHON LEVEL 4: OPERATOR OASIS",
                topic: "Math & Remainder Operators",
                text: "Python can perform arithmetic calculations using +, -, *, /, and the modulus operator (%).",
                code: 'coins = 17 % 5\nprint(coins)',
                explanation: "The % (modulus) operator divides two numbers and gives the remainder (17 divided by 5 leaves 2).",
                question: "What does the % operator return in Python?",
                options: [
                    { text: "A percentage value", answer: "wrong" },
                    { text: "The remainder of division", answer: "correct" },
                    { text: "The product of two numbers", answer: "wrong" }
                ]
            },
            "5": {
                title: "🐍 PYTHON LEVEL 5: DECISION CROSSROADS",
                topic: "If / Else Conditionals",
                text: "Conditionals let your program make decisions based on whether a test is True or False.",
                code: 'health = 80\nif health > 50:\n    print("Ready for battle!")\nelse:\n    print("Need healing!")',
                explanation: "Python uses a colon (:) and indentation (spaces) to group code inside if and else blocks.",
                question: "What character must appear at the end of an if statement line in Python?",
                options: [
                    { text: "A semicolon (;)", answer: "wrong" },
                    { text: "A colon (:)", answer: "correct" },
                    { text: "Curly braces ({})", answer: "wrong" }
                ]
            },
            "6": {
                title: "🐍 PYTHON LEVEL 6: MULTI-PATH JUNGLE",
                topic: "Chaining Conditions with elif",
                text: "When you have more than two possible outcomes, you can test additional conditions in sequence.",
                code: 'xp = 75\nif xp >= 100:\n    print("Master")\nelif xp >= 50:\n    print("Explorer")\nelse:\n    print("Novice")',
                explanation: "In Python, 'elif' stands for 'else if' and checks another condition if the first 'if' was False.",
                question: "Which keyword means 'else if' in Python?",
                options: [
                    { text: "elseif", answer: "wrong" },
                    { text: "elif", answer: "correct" },
                    { text: "otherwise", answer: "wrong" }
                ]
            },
            "7": {
                title: "🐍 PYTHON LEVEL 7: WHILE WATERFALL",
                topic: "Repeating with While Loops",
                text: "A while loop keeps running its indented block of code as long as its condition stays True.",
                code: 'energy = 3\nwhile energy > 0:\n    print("Climbing!")\n    energy = energy - 1',
                explanation: "Make sure the variable inside the condition changes, otherwise the loop will run forever!",
                question: "When does a while loop stop running?",
                options: [
                    { text: "After running exactly once", answer: "wrong" },
                    { text: "When its condition becomes False", answer: "correct" },
                    { text: "When print() is called", answer: "wrong" }
                ]
            },
            "8": {
                title: "🐍 PYTHON LEVEL 8: FOR-LOOP FOREST",
                topic: "Counting with For Loops & range()",
                text: "A for loop is used to repeat code a specific number of times or step through a sequence.",
                code: 'for step in range(3):\n    print("Step", step)',
                explanation: "range(3) generates the numbers 0, 1, and 2, so the loop runs 3 times in total.",
                question: "How many times will 'for i in range(3):' execute its loop body?",
                options: [
                    { text: "2 times", answer: "wrong" },
                    { text: "3 times", answer: "correct" },
                    { text: "4 times", answer: "wrong" }
                ]
            },
            "9": {
                title: "🐍 PYTHON LEVEL 9: LIST LAGOON",
                topic: "Storing Collections in Lists",
                text: "A list stores multiple items in a single variable using square brackets, starting at index 0.",
                code: 'items = ["Map", "Compass", "Torch"]\nprint(items[0])',
                explanation: "List indexing starts at 0, so items[0] accesses the very first element ('Map').",
                question: "What index number accesses the FIRST item in a Python list?",
                options: [
                    { text: "1", answer: "wrong" },
                    { text: "0", answer: "correct" },
                    { text: "-1", answer: "wrong" }
                ]
            },
            "10": {
                title: "🐍 PYTHON LEVEL 10: FUNCTION FORTRESS",
                topic: "Defining Reusable Functions",
                text: "Functions let you bundle instructions under a name so you can call them whenever needed.",
                code: 'def greet_explorer(name):\n    return "Victory, " + name\n\nprint(greet_explorer("Coder"))',
                explanation: "In Python, the 'def' keyword defines a new function, and 'return' sends a result back.",
                question: "Which keyword is used to create a function in Python?",
                options: [
                    { text: "function", answer: "wrong" },
                    { text: "def", answer: "correct" },
                    { text: "void", answer: "wrong" }
                ]
            }
        },
        C: {
            "1": {
                title: "💻 C LEVEL 1: CODING CAMP",
                topic: "Displaying Output in C",
                text: "In C programming, we use standard library functions to display messages on the screen.",
                code: 'printf("Hello, Ancient Ruins!");',
                explanation: "In C, printf() prints text to the screen, and statements end with a semicolon (;).",
                question: "Which function is used to print output in C?",
                options: [
                    { text: "print()", answer: "wrong" },
                    { text: "printf()", answer: "correct" },
                    { text: "console.log()", answer: "wrong" }
                ]
            },
            "2": {
                title: "💻 C LEVEL 2: TEMPLE OF VARIABLES",
                topic: "Variables & Data Types in C",
                text: "In C, you must specify the type of data (like int for whole numbers) when creating a variable.",
                code: 'int player_score = 100;\nprintf("%d", player_score);',
                explanation: "Using 'int' tells C the variable holds an integer, and '%d' formats it inside printf().",
                question: "Which keyword declares a whole-number integer variable in C?",
                options: [
                    { text: "num", answer: "wrong" },
                    { text: "int", answer: "correct" },
                    { text: "var", answer: "wrong" }
                ]
            },
            "3": {
                title: "💻 C LEVEL 3: CHAMBER OF INPUT",
                topic: "Reading Input with scanf()",
                text: "C uses scanf() to read formatted input from the keyboard and store it in a variable's memory address.",
                code: 'int age;\nscanf("%d", &age);',
                explanation: "The ampersand (&) before the variable name tells scanf() the memory address where the value should be stored.",
                question: "Which symbol passes a variable's memory address to scanf() in C?",
                options: [
                    { text: "$", answer: "wrong" },
                    { text: "&", answer: "correct" },
                    { text: "#", answer: "wrong" }
                ]
            },
            "4": {
                title: "💻 C LEVEL 4: ARITHMETIC ALTAR",
                topic: "Arithmetic & Increment Operators",
                text: "C supports standard math operators (+, -, *, /, %) as well as shorthand increment operators.",
                code: 'int gems = 10;\ngems++;\nprintf("%d", gems);',
                explanation: "The ++ operator increases an integer variable's value by 1 (so 10 becomes 11).",
                question: "What does the statement 'gems++;' do in C?",
                options: [
                    { text: "Doubles the value of gems", answer: "wrong" },
                    { text: "Adds 1 to gems", answer: "correct" },
                    { text: "Resets gems to 0", answer: "wrong" }
                ]
            },
            "5": {
                title: "💻 C LEVEL 5: GATE OF CONDITIONS",
                topic: "If / Else Statements in C",
                text: "C uses parentheses () around the condition and curly braces {} around the code block.",
                code: 'int keys = 1;\nif (keys == 1) {\n    printf("Gate Unlocked!");\n} else {\n    printf("Locked!");\n}',
                explanation: "Notice that == compares two values for equality, whereas a single = assigns a value.",
                question: "Which operator checks if two values are equal inside a C if-condition?",
                options: [
                    { text: "=", answer: "wrong" },
                    { text: "==", answer: "correct" },
                    { text: ":=", answer: "wrong" }
                ]
            },
            "6": {
                title: "💻 C LEVEL 6: HALL OF BRANCHES",
                topic: "Multiple Conditions with else if",
                text: "You can test several conditions in C by chaining else if blocks between if and else.",
                code: 'int rank = 2;\nif (rank == 1) {\n    printf("Gold");\n} else if (rank == 2) {\n    printf("Silver");\n} else {\n    printf("Bronze");\n}',
                explanation: "Unlike Python's 'elif', C writes 'else if' as two separate words followed by parentheses.",
                question: "How do you write an 'else if' branch in C?",
                options: [
                    { text: "elif (condition)", answer: "wrong" },
                    { text: "else if (condition)", answer: "correct" },
                    { text: "elseif (condition)", answer: "wrong" }
                ]
            },
            "7": {
                title: "💻 C LEVEL 7: WHILE LABYRINTH",
                topic: "While Loops in C",
                text: "A while loop in C repeatedly executes the block inside {} as long as the condition in () is true.",
                code: 'int torches = 3;\nwhile (torches > 0) {\n    printf("Exploring...");\n    torches--;\n}',
                explanation: "Using torches-- subtracts 1 on each pass so the loop stops after 3 iterations.",
                question: "What encloses the body of a while loop containing multiple lines in C?",
                options: [
                    { text: "Indentation only", answer: "wrong" },
                    { text: "Curly braces { }", answer: "correct" },
                    { text: "Square brackets [ ]", answer: "wrong" }
                ]
            },
            "8": {
                title: "💻 C LEVEL 8: FOR-LOOP SANCTUM",
                topic: "Counter Loops with for()",
                text: "A C for loop packs initialization, condition, and update into one header separated by semicolons.",
                code: 'for (int i = 0; i < 3; i++) {\n    printf("%d ", i);\n}',
                explanation: "int i = 0 runs once at the start; i < 3 is checked before each pass; i++ runs after each pass.",
                question: "Which punctuation separates the three parts inside a C for(...) header?",
                options: [
                    { text: "Commas (,)", answer: "wrong" },
                    { text: "Semicolons (;)", answer: "correct" },
                    { text: "Colons (:)", answer: "wrong" }
                ]
            },
            "9": {
                title: "💻 C LEVEL 9: ARRAY ARCHIVES",
                topic: "Fixed-Size Arrays in C",
                text: "An array in C stores multiple values of the exact same data type in contiguous memory.",
                code: 'int relics[3] = {10, 20, 30};\nprintf("%d", relics[0]);',
                explanation: "Just like Python lists, C arrays are zero-indexed, so relics[0] gives the first element (10).",
                question: "What is printed by printf(\"%d\", relics[0]); in the example above?",
                options: [
                    { text: "3", answer: "wrong" },
                    { text: "10", answer: "correct" },
                    { text: "20", answer: "wrong" }
                ]
            },
            "10": {
                title: "💻 C LEVEL 10: CITADEL OF FUNCTIONS",
                topic: "Functions & Return Types in C",
                text: "Every C function specifies the data type of the value it returns (such as int, float, or void).",
                code: 'int add_xp(int a, int b) {\n    return a + b;\n}\nprintf("%d", add_xp(10, 20));',
                explanation: "Because add_xp returns a whole number sum, its declaration starts with the return type 'int'.",
                question: "What does the 'int' before 'add_xp(int a, int b)' specify?",
                options: [
                    { text: "The number of loops inside", answer: "wrong" },
                    { text: "The data type returned by the function", answer: "correct" },
                    { text: "That the function returns nothing", answer: "wrong" }
                ]
            }
        },
        CPP: {
            "1": {
                title: "⚔️ C++ LEVEL 1: STREAM OUTPOST",
                topic: "Displaying Output with cout",
                text: "C++ uses the iostream library and std::cout with the insertion operator (<<) to display output.",
                code: 'std::cout << "Hello, Citadel!";',
                explanation: "Think of the << operator as pointing data into the console output stream (cout).",
                question: "Which operator sends output to std::cout in C++?",
                options: [
                    { text: ">>", answer: "wrong" },
                    { text: "<<", answer: "correct" },
                    { text: "->", answer: "wrong" }
                ]
            },
            "2": {
                title: "⚔️ C++ LEVEL 2: VARIABLE VAULT",
                topic: "Variables & std::string in C++",
                text: "Alongside int, double, and bool, C++ provides a built-in string type for storing text.",
                code: 'std::string hero = "Knight";\nint level = 5;\nstd::cout << hero;',
                explanation: "In C++, std::string holds text in double quotes, while int holds whole numbers.",
                question: "Which data type is used to store true or false values in C++?",
                options: [
                    { text: "boolean", answer: "wrong" },
                    { text: "bool", answer: "correct" },
                    { text: "bit", answer: "wrong" }
                ]
            },
            "3": {
                title: "⚔️ C++ LEVEL 3: SHRINE OF CIN",
                topic: "Reading User Input with cin",
                text: "C++ reads keyboard input using std::cin paired with the extraction operator (>>).",
                code: 'int potions;\nstd::cin >> potions;',
                explanation: "Unlike cout <<, cin uses >> to extract characters from the keyboard into your variable.",
                question: "Which object and operator read keyboard input in C++?",
                options: [
                    { text: "std::cin >>", answer: "correct" },
                    { text: "std::cin <<", answer: "wrong" },
                    { text: "std::input >>", answer: "wrong" }
                ]
            },
            "4": {
                title: "⚔️ C++ LEVEL 4: OPERATOR FORGE",
                topic: "Compound Assignment Operators",
                text: "C++ lets you update a variable's value in place using compound operators like += and -=.",
                code: 'int shield = 50;\nshield += 25;\nstd::cout << shield;',
                explanation: "shield += 25 adds 25 directly to shield, updating its value to 75.",
                question: "What is the value of x after running: int x = 10; x += 5; ?",
                options: [
                    { text: "5", answer: "wrong" },
                    { text: "15", answer: "correct" },
                    { text: "50", answer: "wrong" }
                ]
            },
            "5": {
                title: "⚔️ C++ LEVEL 5: GUARDIAN GATE",
                topic: "If / Else Decisions in C++",
                text: "C++ evaluates boolean conditions inside parentheses () and executes the matching {} block.",
                code: 'int stamina = 90;\nif (stamina >= 50) {\n    std::cout << "Charge!";\n} else {\n    std::cout << "Rest!";\n}',
                explanation: "If the condition is true, the first block runs; otherwise, the else block runs.",
                question: "Which operator means 'greater than or equal to' in C++?",
                options: [
                    { text: "=>", answer: "wrong" },
                    { text: ">=", answer: "correct" },
                    { text: "==", answer: "wrong" }
                ]
            },
            "6": {
                title: "⚔️ C++ LEVEL 6: BASTION OF BRANCHES",
                topic: "Chaining Conditions with else if",
                text: "Use else if in C++ to check multiple conditions in order from top to bottom.",
                code: 'int score = 85;\nif (score >= 90) {\n    std::cout << "S Rank";\n} else if (score >= 80) {\n    std::cout << "A Rank";\n} else {\n    std::cout << "B Rank";\n}',
                explanation: "As soon as one condition evaluates to true, its block runs and the rest of the chain is skipped.",
                question: "What will the code snippet above output when score is 85?",
                options: [
                    { text: "S Rank", answer: "wrong" },
                    { text: "A Rank", answer: "correct" },
                    { text: "B Rank", answer: "wrong" }
                ]
            },
            "7": {
                title: "⚔️ C++ LEVEL 7: WHILE WHIRLPOOL",
                topic: "While Loops in C++",
                text: "A C++ while loop checks its condition before every iteration and stops once it becomes false.",
                code: 'int waves = 3;\nwhile (waves > 0) {\n    std::cout << "Defend! ";\n    waves--;\n}',
                explanation: "Decrementing waves with waves-- ensures the loop finishes after 3 waves.",
                question: "What happens if a while loop's condition never becomes false?",
                options: [
                    { text: "It becomes an infinite loop", answer: "correct" },
                    { text: "It skips the loop automatically", answer: "wrong" },
                    { text: "It runs exactly 10 times", answer: "wrong" }
                ]
            },
            "8": {
                title: "⚔️ C++ LEVEL 8: FOR-LOOP FOUNDRY",
                topic: "For Loops in C++",
                text: "A for loop is ideal when you know exactly how many times you want a block of code to repeat.",
                code: 'for (int i = 1; i <= 3; i++) {\n    std::cout << i << " ";\n}',
                explanation: "Starting at i = 1 and looping while i <= 3 prints '1 2 3 '.",
                question: "What is the first value printed by: for (int i = 1; i <= 3; i++) ?",
                options: [
                    { text: "0", answer: "wrong" },
                    { text: "1", answer: "correct" },
                    { text: "3", answer: "wrong" }
                ]
            },
            "9": {
                title: "⚔️ C++ LEVEL 9: VECTOR SANCTUARY",
                topic: "Dynamic Arrays with std::vector",
                text: "Unlike fixed C arrays, a C++ std::vector can grow dynamically as you add new elements.",
                code: 'std::vector<int> loot = {10, 20};\nloot.push_back(30);\nstd::cout << loot.size();',
                explanation: "push_back(30) appends 30 to the end of the vector, bringing its total size to 3.",
                question: "Which vector method adds a new item to the end of a std::vector in C++?",
                options: [
                    { text: "append()", answer: "wrong" },
                    { text: "push_back()", answer: "correct" },
                    { text: "insert_end()", answer: "wrong" }
                ]
            },
            "10": {
                title: "⚔️ C++ LEVEL 10: CITADEL OF CLASSES",
                topic: "Object-Oriented Classes in C++",
                text: "C++ is famous for Object-Oriented Programming (OOP), allowing you to bundle data and functions into a class.",
                code: 'class Hero {\npublic:\n    int hp = 100;\n};\nHero player;\nstd::cout << player.hp;',
                explanation: "The 'public:' access specifier allows code outside the class to access player.hp.",
                question: "Which keyword makes class members accessible outside the class in C++?",
                options: [
                    { text: "private:", answer: "wrong" },
                    { text: "public:", answer: "correct" },
                    { text: "global:", answer: "wrong" }
                ]
            }
        },
        Java: {
            "1": {
                title: "☕ JAVA LEVEL 1: HARBOR OF OUTPUT",
                topic: "Printing Output in Java",
                text: "Java programs live inside classes and use System.out.println() to print a line of text to the console.",
                code: 'System.out.println("Ahoy, Java Island!");',
                explanation: "System.out.println() prints the text inside the quotes and moves the cursor to a new line.",
                question: "Which statement prints a line of text in Java?",
                options: [
                    { text: "console.write()", answer: "wrong" },
                    { text: "System.out.println()", answer: "correct" },
                    { text: "echo()", answer: "wrong" }
                ]
            },
            "2": {
                title: "☕ JAVA LEVEL 2: VARIABLE VOLCANO",
                topic: "Data Types & Variables in Java",
                text: "Java is a strongly typed language where every variable is declared with a type like int, double, boolean, or String.",
                code: 'String shipName = " Voyager";\nint crew = 12;\nSystem.out.println(crew);',
                explanation: "Notice that String starts with a capital 'S' in Java because it is an object type, while int is lowercase.",
                question: "How is the text data type spelled in Java?",
                options: [
                    { text: "string (lowercase s)", answer: "wrong" },
                    { text: "String (capital S)", answer: "correct" },
                    { text: "str", answer: "wrong" }
                ]
            },
            "3": {
                title: "☕ JAVA LEVEL 3: SCANNER LAGOON",
                topic: "Reading Input with Scanner",
                text: "Java uses the Scanner class from java.util to read user input from System.in.",
                code: 'Scanner sc = new Scanner(System.in);\nString name = sc.nextLine();',
                explanation: "Creating a Scanner object with new Scanner(System.in) lets you call nextLine() or nextInt().",
                question: "Which Java class is commonly used to read console input from System.in?",
                options: [
                    { text: "Reader", answer: "wrong" },
                    { text: "Scanner", answer: "correct" },
                    { text: "Inputter", answer: "wrong" }
                ]
            },
            "4": {
                title: "☕ JAVA LEVEL 4: OPERATOR ATOLL",
                topic: "String Concatenation & Math",
                text: "In Java, the + operator adds numbers together and also joins (concatenates) strings with values.",
                code: 'int gold = 50;\nSystem.out.println("Gold: " + gold);',
                explanation: "Combining a String with an int using + automatically converts the number into text: 'Gold: 50'.",
                question: "What does System.out.println(\"Level \" + 4); display in Java?",
                options: [
                    { text: "Level 4", answer: "correct" },
                    { text: "Level + 4", answer: "wrong" },
                    { text: "An error", answer: "wrong" }
                ]
            },
            "5": {
                title: "☕ JAVA LEVEL 5: TEMPLE OF LOGIC",
                topic: "If / Else Statements in Java",
                text: "Java uses boolean conditions inside parentheses () and curly braces {} for if/else blocks.",
                code: 'boolean hasCompass = true;\nif (hasCompass) {\n    System.out.println("On course!");\n} else {\n    System.out.println("Lost at sea!");\n}',
                explanation: "In Java, boolean variables hold either true or false (written in all lowercase).",
                question: "What are the two valid boolean values in Java?",
                options: [
                    { text: "True and False", answer: "wrong" },
                    { text: "true and false", answer: "correct" },
                    { text: "1 and 0", answer: "wrong" }
                ]
            },
            "6": {
                title: "☕ JAVA LEVEL 6: BRIDGE OF CHOICES",
                topic: "Multiple Branches with else if",
                text: "Chain else if statements in Java to test multiple possibilities cleanly.",
                code: 'int wind = 25;\nif (wind > 30) {\n    System.out.println("Storm");\n} else if (wind > 15) {\n    System.out.println("Breeze");\n} else {\n    System.out.println("Calm");\n}',
                explanation: "Since 25 is not greater than 30, Java checks the else if (wind > 15), which is true, and prints 'Breeze'.",
                question: "What is printed by the Java code above when wind is 25?",
                options: [
                    { text: "Storm", answer: "wrong" },
                    { text: "Breeze", answer: "correct" },
                    { text: "Calm", answer: "wrong" }
                ]
            },
            "7": {
                title: "☕ JAVA LEVEL 7: WHILE TIDES",
                topic: "While Loops in Java",
                text: "A while loop in Java repeats its block of statements while its boolean condition evaluates to true.",
                code: 'intleagues = 3;\nwhile (leagues > 0) {\n    System.out.println("Sailing...");\n    leagues--;\n}',
                explanation: "Each pass prints 'Sailing...' and decreases leagues by 1 until leagues reaches 0.",
                question: "Which statement subtracts 1 from the variable 'leagues' in Java?",
                options: [
                    { text: "leagues--;", answer: "correct" },
                    { text: "leagues -= 0;", answer: "wrong" },
                    { text: "--1;", answer: "wrong" }
                ]
            },
            "8": {
                title: "☕ JAVA LEVEL 8: FOR-LOOP GROVE",
                topic: "Counting with Java For Loops",
                text: "Java's standard for loop initializes a counter, checks a condition, and updates the counter on each turn.",
                code: 'for (int i = 0; i < 4; i++) {\n    System.out.println(i);\n}',
                explanation: "With i starting at 0 and running while i < 4, the loop runs for i = 0, 1, 2, and 3 (4 times total).",
                question: "How many times does 'for (int i = 0; i < 4; i++)' run?",
                options: [
                    { text: "3 times", answer: "wrong" },
                    { text: "4 times", answer: "correct" },
                    { text: "5 times", answer: "wrong" }
                ]
            },
            "9": {
                title: "☕ JAVA LEVEL 9: ARRAY ARCHIPELAGO",
                topic: "Arrays & .length in Java",
                text: "Java arrays store multiple values of the same type and know their own size via the .length property.",
                code: 'int[]gems = {5, 10, 15};\nSystem.out.println(gems.length);',
                explanation: "In Java, gems.length returns the number of elements in the array (3), and gems[0] accesses the first item (5).",
                question: "How do you get the number of elements in a Java array named 'gems'?",
                options: [
                    { text: "gems.length", answer: "correct" },
                    { text: "len(gems)", answer: "wrong" },
                    { text: "gems.count()", answer: "wrong" }
                ]
            },
            "10": {
                title: "☕ JAVA LEVEL 10: MONASTERY OF METHODS",
                topic: "Defining Methods in Java",
                text: "In Java, functions inside a class are called methods and declare their return type (or void if they return nothing).",
                code: 'public static int doubleXP(int xp) {\n    return xp * 2;\n}\nSystem.out.println(doubleXP(50));',
                explanation: "The return keyword sends xp * 2 back to the caller, printing 100.",
                question: "Which return type keyword is used when a Java method does NOT return any value?",
                options: [
                    { text: "null", answer: "wrong" },
                    { text: "void", answer: "correct" },
                    { text: "none", answer: "wrong" }
                ]
            }
        }
    };

    // Count total completed levels across all 4 worlds (40 total levels)
    function getCompletedCount() {
        let count = 0;
        ["Python", "C", "CPP", "Java"].forEach(function (lang) {
            for (let i = 1; i <= 10; i++) {
                if (localStorage.getItem("codequest" + lang + "Level" + i + "Completed") === "true") {
                    count++;
                }
            }
        });
        return count;
    }

    // Show the active language world screen
    function showCurrentWorldScreen() {
        hideAllScreens();
        const targetScreen = worldScreens[currentLanguage] || pythonScreen;
        if (targetScreen) {
            targetScreen.hidden = false;
            targetScreen.style.display = "flex";
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Build and inject Player HUD on Language Selection and all 4 World screens
    function injectPlayerHUD() {
        [languageScreen, pythonScreen, cScreen, cppScreen, javaScreen].forEach(function (screen) {
            if (!screen || screen.querySelector(".player-hud")) return;

            const hud = document.createElement("div");
            hud.className = "player-hud";
            hud.innerHTML =
                '<div class="hud-stats">' +
                    '<span class="hud-xp">⭐ TOTAL XP: ' + totalXP + '</span>' +
                    '<span class="hud-progress">🏆 COMPLETED: ' + getCompletedCount() + ' / 40</span>' +
                '</div>' +
                '<div class="hud-reset-buttons">' +
                    '<button type="button" class="reset-btn reset-xp-btn">🔄 RESET XP</button>' +
                    '<button type="button" class="reset-btn reset-progress-btn">🔄 RESET PROGRESS</button>' +
                '</div>' +
                '<p class="hud-status-msg" aria-live="polite"></p>';

            const subtitle = screen.querySelector(".subtitle");
            if (subtitle && subtitle.nextSibling) {
                screen.insertBefore(hud, subtitle.nextSibling);
            } else {
                screen.appendChild(hud);
            }
        });

        document.querySelectorAll(".reset-xp-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                totalXP = 0;
                localStorage.setItem("codequestXP", 0);
                updateLevelBadges();
                showHudMessage("✨ XP has been reset to 0!");
            });
        });

        document.querySelectorAll(".reset-progress-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                ["Python", "C", "CPP", "Java"].forEach(function (lang) {
                    for (let i = 1; i <= 10; i++) {
                        localStorage.removeItem("codequest" + lang + "Level" + i + "Completed");
                    }
                });
                updateLevelBadges();
                showHudMessage("🌿 Level progress across all 4 worlds has been reset!");
            });
        });
    }

    function showHudMessage(msg) {
        document.querySelectorAll(".hud-status-msg").forEach(function (el) {
            el.textContent = msg;
        });
        setTimeout(function () {
            document.querySelectorAll(".hud-status-msg").forEach(function (el) {
                el.textContent = "";
            });
        }, 3000);
    }

    // Update level card badges and HUD counters across all 40 levels
    function updateLevelBadges() {
        levelButtons.forEach(function (button) {
            const lang = button.dataset.language;
            const lvl = button.dataset.level || "1";
            const lessonKey = "codequest" + lang + "Level" + lvl + "Completed";
            const isCompleted = localStorage.getItem(lessonKey) === "true";
            const card = button.closest(".world-card");

            if (!card) return;

            const existingBadge = card.querySelector(".completed-badge");

            if (isCompleted) {
                card.classList.add("completed-card");
                if (!existingBadge) {
                    const badge = document.createElement("span");
                    badge.className = "completed-badge";
                    badge.textContent = "✅ COMPLETED";
                    card.insertBefore(badge, card.firstChild);
                }
                button.textContent = "🔄 REPLAY LEVEL " + lvl;
            } else {
                card.classList.remove("completed-card");
                if (existingBadge) {
                    existingBadge.remove();
                }
                button.textContent = "▶ START LEVEL " + lvl;
            }
        });

        if (xpDisplay) {
            xpDisplay.textContent = "⭐ TOTAL XP: " + totalXP;
        }
        if (achievementXP) {
            achievementXP.textContent = "⭐ TOTAL XP: " + totalXP;
        }
        document.querySelectorAll(".hud-xp").forEach(function (el) {
            el.textContent = "⭐ TOTAL XP: " + totalXP;
        });
        const completedTotal = getCompletedCount();
        document.querySelectorAll(".hud-progress").forEach(function (el) {
            el.textContent = "🏆 COMPLETED: " + completedTotal + " / 40";
        });
    }

    // Helper to hide all screens cleanly
    function hideAllScreens() {
        [homeScreen, languageScreen, pythonScreen, cScreen, cppScreen, javaScreen, lessonScreen, achievementScreen].forEach(function (screen) {
            if (screen) {
                screen.hidden = true;
                screen.style.display = "none";
            }
        });
    }

    // Reusable function to load any Level (1-10) in Python, C, C++, or Java World
    function loadLevel(lang, lvl) {
        currentLanguage = lang;
        currentLevel = String(lvl);
        const data = contentData[currentLanguage][currentLevel];

        // Populate lesson content
        lessonTitle.textContent = data.title;
        lessonTopic.textContent = data.topic;
        lessonText.textContent = data.text;
        lessonCode.textContent = data.code;
        lessonExplanation.textContent = data.explanation;

        // Populate quiz content & clear previous styling
        quizQuestion.textContent = data.question;
        quizOptions.forEach(function (optionButton, index) {
            optionButton.textContent = data.options[index].text;
            optionButton.dataset.answer = data.options[index].answer;
            optionButton.disabled = false;
            optionButton.classList.remove("wrong-choice", "correct-choice");
        });

        // Reset quiz feedback & buttons
        answeredCorrectly = false;
        quizFeedback.textContent = "";
        quizFeedback.className = "";
        xpGainBanner.hidden = true;
        xpGainBanner.style.display = "none";
        xpDisplay.textContent = "⭐ TOTAL XP: " + totalXP;
        quizBox.hidden = true;
        quizBox.style.display = "none";
        nextLevelButton.hidden = true;
        nextLevelButton.style.display = "none";

        hideAllScreens();
        lessonScreen.hidden = false;
        lessonScreen.style.display = "flex";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Initialize HUD and Badges on load
    injectPlayerHUD();
    updateLevelBadges();

    // 1. Home -> Language Selection
    startButton.addEventListener("click", function () {
        updateLevelBadges();
        hideAllScreens();
        languageScreen.hidden = false;
        languageScreen.style.display = "flex";
    });

    // 2. Language Selection -> Home
    backButton.addEventListener("click", function () {
        hideAllScreens();
        homeScreen.hidden = false;
        homeScreen.style.display = "flex";
    });

    // 3. Language Selection -> Python, C, C++, or Java World
    languageCards.forEach(function (card) {
        card.addEventListener("click", function () {
            currentLanguage = card.dataset.language;
            updateLevelBadges();
            showCurrentWorldScreen();
        });
    });

    // 4. World -> Language Selection
    worldBackButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            updateLevelBadges();
            hideAllScreens();
            languageScreen.hidden = false;
            languageScreen.style.display = "flex";
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    // 5. Open Any Level Lesson from Any World Screen
    levelButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            loadLevel(button.dataset.language, button.dataset.level || "1");
        });
    });

    // 6. Complete Lesson -> Show Quiz
    completeLessonButton.addEventListener("click", function () {
        quizBox.hidden = false;
        quizBox.style.display = "flex";
        xpDisplay.textContent = "⭐ TOTAL XP: " + totalXP;
        quizBox.scrollIntoView({ behavior: "smooth" });
    });

    // 7. Check Quiz Answer (Instant Right/Wrong + XP Animation + Next Level Option)
    quizOptions.forEach(function (option) {
        option.addEventListener("click", function () {
            if (answeredCorrectly) return;

            if (option.dataset.answer === "correct") {
                answeredCorrectly = true;
                option.classList.remove("wrong-choice");
                option.classList.add("correct-choice");

                const lessonKey = "codequest" + currentLanguage + "Level" + currentLevel + "Completed";
                const alreadyCompleted = localStorage.getItem(lessonKey) === "true";

                quizFeedback.className = "feedback-correct";

                // Trigger +10 XP animation
                xpGainBanner.hidden = false;
                xpGainBanner.style.display = "inline-block";
                xpGainBanner.style.animation = "none";
                void xpGainBanner.offsetWidth;
                xpGainBanner.style.animation = "xpPopFloat 0.6s ease-out forwards";

                if (!alreadyCompleted) {
                    totalXP += 10;
                    localStorage.setItem("codequestXP", totalXP);
                    localStorage.setItem(lessonKey, "true");
                    xpGainBanner.textContent = "✨ +10 XP GAINED! ⭐";
                    quizFeedback.textContent = "✅ Correct! Great work, Explorer!";
                } else {
                    xpGainBanner.textContent = "⭐ LEVEL COMPLETED (+0 XP REPLAY)";
                    quizFeedback.textContent = "✅ Correct! You already earned the XP for this level.";
                }

                updateLevelBadges();

                quizOptions.forEach(function (item) {
                    item.disabled = true;
                });

                const nextLvlNum = Number(currentLevel) + 1;
                if (nextLvlNum <= 10) {
                    nextLevelButton.textContent = "▶ GO TO LEVEL " + nextLvlNum;
                } else {
                    nextLevelButton.textContent = "🏆 CLAIM WORLD ACHIEVEMENT";
                }

                nextLevelButton.hidden = false;
                nextLevelButton.style.display = "inline-block";
            } else {
                option.classList.remove("wrong-choice");
                void option.offsetWidth;
                option.classList.add("wrong-choice");

                quizFeedback.className = "feedback-wrong";
                quizFeedback.textContent = "❌ Wrong answer! Try another option, Explorer! 🌿";
            }
        });
    });

    // 8. Lesson Back -> Return to Active World (Python, C, C++, or Java)
    lessonBackButton.addEventListener("click", function () {
        updateLevelBadges();
        showCurrentWorldScreen();
    });

    // 9. Next Level Button -> Advance Directly to Next Level (1->2->...->10) or Achievement Screen
    nextLevelButton.addEventListener("click", function () {
        const nextLvlNum = Number(currentLevel) + 1;
        if (nextLvlNum <= 10) {
            loadLevel(currentLanguage, nextLvlNum);
        } else {
            updateLevelBadges();
            hideAllScreens();
            achievementScreen.hidden = false;
            achievementScreen.style.display = "flex";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // 10. Return from Achievement Screen to Active World
    achievementBackButton.addEventListener("click", function () {
        updateLevelBadges();
        showCurrentWorldScreen();
    });
});



/* =========================================================
   REALISTIC 60FPS FOREST CANVAS ENGINE (LEAVES, FIREFLIES & WIND)
   ========================================================= */
(function initRealisticForest() {
    // 1. Create Sunbeams, Mist, and HTML5 Canvas layers automatically
    const sunbeams = document.createElement("div");
    sunbeams.className = "forest-sunbeams";
    document.body.prepend(sunbeams);

    const mist = document.createElement("div");
    mist.className = "forest-mist";
    document.body.prepend(mist);

    const canvas = document.createElement("canvas");
    canvas.id = "forestCanvas";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Interactive wind responds gently to mouse movement
    let targetWind = 0.4;
    let currentWind = 0.4;
    window.addEventListener("mousemove", function (e) {
        const normalizedX = (e.clientX / width - 0.5) * 2; // -1 to 1
        targetWind = 0.4 + normalizedX * 1.1;
    });

    // 2. Botanical Leaf Particles with 3D Tumble, Sway & Veins
    const leafColors = ["#5fa85b", "#3f8746", "#7ec46b", "#96c95b", "#2e6b38"];
    const leaves = Array.from({ length: 28 }, function () {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: 9 + Math.random() * 10,
            speedY: 0.45 + Math.random() * 0.75,
            speedX: 0.2 + Math.random() * 0.5,
            swayAmp: 0.8 + Math.random() * 1.6,
            swaySpeed: 0.01 + Math.random() * 0.02,
            swayOffset: Math.random() * Math.PI * 2,
            angle: Math.random() * Math.PI * 2,
            spinSpeed: (Math.random() - 0.5) * 0.02,
            flip: Math.random() * Math.PI * 2,
            flipSpeed: 0.015 + Math.random() * 0.03,
            color: leafColors[Math.floor(Math.random() * leafColors.length)],
            opacity: 0.55 + Math.random() * 0.35
        };
    });

    // 3. Glowing Forest Fireflies with Soft Radial Light
    const fireflies = Array.from({ length: 24 }, function () {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 2 + Math.random() * 2.5,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -0.15 - Math.random() * 0.35,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            pulsePhase: Math.random() * Math.PI * 2
        };
    });

    // Helper: Draw a realistic tapered jungle leaf with center vein
    function drawLeaf(leaf) {
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        // Simulate 3D leaf flipping in the breeze using vertical scale
        const scaleY = Math.cos(leaf.flip) * 0.75 + 0.25;
        ctx.scale(1, scaleY);
        ctx.globalAlpha = leaf.opacity;

        const s = leaf.size;
        ctx.fillStyle = leaf.color;
        ctx.beginPath();
        ctx.moveTo(-s, 0);
        ctx.quadraticCurveTo(0, -s * 0.75, s, 0);
        ctx.quadraticCurveTo(0, s * 0.75, -s, 0);
        ctx.closePath();
        ctx.fill();

        // Subtle leaf center vein
        ctx.strokeStyle = "rgba(255, 248, 214, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-s * 0.85, 0);
        ctx.lineTo(s * 0.85, 0);
        ctx.stroke();

        ctx.restore();
    }

    // Helper: Draw a glowing firefly with soft radial halo
    function drawFirefly(fly) {
        const glow = (Math.sin(fly.pulsePhase) + 1) * 0.5; // 0 to 1
        const alpha = 0.15 + glow * 0.75;
        const glowRadius = fly.radius * (3.5 + glow * 2.5);

        ctx.save();
        const grad = ctx.createRadialGradient(fly.x, fly.y, 0, fly.x, fly.y, glowRadius);
        grad.addColorStop(0, "rgba(255, 245, 150, " + alpha + ")");
        grad.addColorStop(0.4, "rgba(180, 255, 120, " + alpha * 0.5 + ")");
        grad.addColorStop(1, "rgba(180, 255, 120, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(fly.x, fly.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // 4. Master 60FPS Animation Loop
    function animateForest() {
        ctx.clearRect(0, 0, width, height);

        // Smoothly interpolate wind toward cursor direction
        currentWind += (targetWind - currentWind) * 0.03;

        // Update & draw glowing fireflies
        for (let i = 0; i < fireflies.length; i++) {
            const f = fireflies[i];
            f.pulsePhase += f.pulseSpeed;
            f.x += f.vx + Math.sin(f.pulsePhase * 0.7) * 0.25 + currentWind * 0.2;
            f.y += f.vy + Math.cos(f.pulsePhase * 0.5) * 0.15;

            if (f.y < -20) f.y = height + 20;
            if (f.x > width + 20) f.x = -20;
            if (f.x < -20) f.x = width + 20;

            drawFirefly(f);
        }

        // Update & draw 3D tumbling leaves
        for (let i = 0; i < leaves.length; i++) {
            const l = leaves[i];
            l.swayOffset += l.swaySpeed;
            l.flip += l.flipSpeed;
            l.angle += l.spinSpeed + Math.cos(l.swayOffset) * 0.005;

            l.x += currentWind * l.speedX + Math.sin(l.swayOffset) * l.swayAmp;
            l.y += l.speedY;

            // Wrap leaves seamlessly around screen edges
            if (l.y > height + 30) {
                l.y = -25;
                l.x = Math.random() * width;
            }
            if (l.x > width + 30) l.x = -25;
            if (l.x < -30) l.x = width + 25;

            drawLeaf(l);
        }

        requestAnimationFrame(animateForest);
    }

    requestAnimationFrame(animateForest);
})();


/* =========================================================
   60FPS MONKEYS, BIRDS, RIVER WAVES, JUMPING FISH & SPLASH ENGINE
   ========================================================= */
(function initUltimateJungleWorld() {
    // 1. Clean up any previous canvas layers to prevent duplicates
    ["#forestCanvas", ".forest-sunbeams", ".forest-mist"].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            el.remove();
        });
    });

    // 2. Inject Sunbeams, Mist, and Fullscreen 60FPS Wildlife Canvas
    const sunbeams = document.createElement("div");
    sunbeams.className = "forest-sunbeams";
    document.body.prepend(sunbeams);

    const mist = document.createElement("div");
    mist.className = "forest-mist";
    document.body.prepend(mist);

    const canvas = document.createElement("canvas");
    canvas.id = "forestCanvas";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Interactive cursor breeze
    let targetWind = 0.35;
    let currentWind = 0.35;
    window.addEventListener("mousemove", function (e) {
        const normX = (e.clientX / width - 0.5) * 2;
        targetWind = 0.35 + normX * 0.9;
    });

    // 3. Inject Custom Animated Wildlife Bars into Every Section of the Website
    const sectionWildlifeConfig = [
        { selector: ".home-screen", left: "🐒", flyer1: "🦜", flyer2: "🦅", right: "🌴🐅" },
        { selector: "#languageScreen", left: "🌿🦍", flyer1: "🦜", flyer2: "🦋", right: "🐆🌿" },
        { selector: "#pythonScreen", left: "🐍🌿", flyer1: "🦜", flyer2: "🦋", right: "🐊🌴" },
        { selector: "#cScreen", left: "🪨🦎", flyer1: "🦅", flyer2: "🦜", right: "🏛️🐒" },
        { selector: "#cppScreen", left: "⚔️🐅", flyer1: "🦅", flyer2: "🦋", right: "🏰🦍" },
        { selector: "#javaScreen", left: "🏝️🐒", flyer1: "🦜", flyer2: "🦩", right: "☕🐢" },
        { selector: "#lessonScreen", left: "🌿🐒", flyer1: "🦜", flyer2: "🦋", right: "🦉🌴" },
        { selector: "#achievementScreen", left: "🏆🐒", flyer1: "🦜", flyer2: "🦅", right: "🦁✨" }
    ];

    sectionWildlifeConfig.forEach(function (cfg) {
        const section = document.querySelector(cfg.selector);
        if (!section || section.querySelector(".jungle-wildlife-stage")) return;

        const stage = document.createElement("div");
        stage.className = "jungle-wildlife-stage";
        stage.innerHTML =
            '<span class="stage-vine-swinger">' + cfg.left + '</span>' +
            '<span class="stage-flying-bird">' + cfg.flyer1 + '</span>' +
            '<span class="stage-flying-bird bird-delayed">' + cfg.flyer2 + '</span>' +
            '<span class="stage-ground-animal">' + cfg.right + '</span>';

        const decor = section.querySelector(".jungle-decoration");
        if (decor && decor.nextSibling) {
            section.insertBefore(stage, decor.nextSibling);
        } else {
            section.prepend(stage);
        }
    });

    // 4. TWO SWINGING JUNGLE MONKEYS ON LEFT & RIGHT CANOPY VINES
    const swingState = {
        time: 0,
        speed: 0.022,
        maxAngle: 0.65,
        vineLength: 220
    };

    function drawCanopyMonkey(pivotX, pivotY, vineLen, angle, angularVelocity, scaleMultiplier, isLeft) {
        const endX = pivotX + Math.sin(angle) * vineLen;
        const endY = pivotY + Math.cos(angle) * vineLen;

        ctx.save();

        const ctrlX = pivotX + Math.sin(angle * 0.6) * (vineLen * 0.55);
        const ctrlY = pivotY + Math.cos(angle * 0.6) * (vineLen * 0.55);

        ctx.strokeStyle = "#2b4c26";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY + 18);
        ctx.stroke();

        for (let t = 0.25; t <= 0.75; t += 0.25) {
            const lx = (1 - t) * (1 - t) * pivotX + 2 * (1 - t) * t * ctrlX + t * t * endX;
            const ly = (1 - t) * (1 - t) * pivotY + 2 * (1 - t) * t * ctrlY + t * t * endY;
            ctx.fillStyle = "#4d8f46";
            ctx.beginPath();
            ctx.ellipse(lx + (isLeft ? 6 : -6), ly, 7, 3.5, angle + 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.translate(endX, endY);
        ctx.rotate(-angle * 0.8);
        const facing = angularVelocity >= 0 ? 1 : -1;
        ctx.scale(facing * scaleMultiplier, scaleMultiplier);

        // Curled monkey tail
        ctx.strokeStyle = "#5c3a21";
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-4, 34);
        ctx.quadraticCurveTo(-22, 38, -20, 22);
        ctx.arc(-15, 22, 5, Math.PI, Math.PI * 2.5, false);
        ctx.stroke();

        // Arm gripping vine
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-2, 16);
        ctx.stroke();

        // Ears
        ctx.fillStyle = "#5c3a21";
        ctx.beginPath();
        ctx.arc(-6, 14, 4, 0, Math.PI * 2);
        ctx.arc(6, 14, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#d9a066";
        ctx.beginPath();
        ctx.arc(-6, 14, 2.2, 0, Math.PI * 2);
        ctx.arc(6, 14, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Head & Muzzle
        ctx.fillStyle = "#5c3a21";
        ctx.beginPath();
        ctx.arc(0, 14, 7.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#d9a066";
        ctx.beginPath();
        ctx.ellipse(2, 15.5, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#1e1610";
        ctx.beginPath();
        ctx.arc(3.5, 13.5, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Torso & Belly
        ctx.fillStyle = "#5c3a21";
        ctx.beginPath();
        ctx.ellipse(-1, 28, 7.5, 10, 0.08, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#d9a066";
        ctx.beginPath();
        ctx.ellipse(1, 28, 4.5, 7, 0.08, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.strokeStyle = "#5c3a21";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(1, 36);
        ctx.lineTo(7, 45);
        ctx.lineTo(3, 52);
        ctx.moveTo(-4, 36);
        ctx.lineTo(-10, 44);
        ctx.lineTo(-14, 50);
        ctx.stroke();

        ctx.restore();
    }

    // 5. FLAPPING TROPICAL BIRDS
    const birdColors = [
        { body: "#e63946", wing: "#ffb703", tail: "#1d3557" },
        { body: "#2a9d8f", wing: "#e9c46a", tail: "#264653" },
        { body: "#1f2421", wing: "#3b423f", beak: "#f4a261" }
    ];

    const birds = Array.from({ length: 8 }, function (_, idx) {
        const dir = idx % 2 === 0 ? 1 : -1;
        return {
            x: Math.random() * width,
            y: 45 + Math.random() * (height * 0.38),
            vx: dir * (1.2 + Math.random() * 1.3),
            vy: (Math.random() - 0.5) * 0.25,
            size: 10 + Math.random() * 6,
            flapPhase: Math.random() * Math.PI * 2,
            flapSpeed: 0.14 + Math.random() * 0.06,
            palette: birdColors[idx % birdColors.length],
            dir: dir
        };
    });

    function drawBird(b) {
        const wingY = Math.sin(b.flapPhase) * b.size * 0.95;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.scale(b.dir, 1);

        ctx.fillStyle = b.palette.tail || b.palette.body;
        ctx.beginPath();
        ctx.moveTo(-b.size * 0.6, 0);
        ctx.lineTo(-b.size * 1.4, -3);
        ctx.lineTo(-b.size * 1.3, 4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = b.palette.body;
        ctx.beginPath();
        ctx.ellipse(0, 0, b.size * 0.75, b.size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = b.palette.beak || "#ffd166";
        ctx.beginPath();
        ctx.moveTo(b.size * 0.65, -2);
        ctx.lineTo(b.size * 1.15, 1);
        ctx.lineTo(b.size * 0.65, 3);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = b.palette.wing;
        ctx.beginPath();
        ctx.moveTo(-b.size * 0.2, 0);
        ctx.quadraticCurveTo(0, -wingY * 1.2, b.size * 0.35, -wingY);
        ctx.quadraticCurveTo(b.size * 0.1, 0, -b.size * 0.2, 0);
        ctx.fill();

        ctx.restore();
    }

    // 6. BUTTERFLIES, LEAVES & FIREFLIES
    const butterflies = Array.from({ length: 8 }, function (_, i) {
        return {
            x: Math.random() * width,
            y: Math.random() * (height - 140),
            angle: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 0.5,
            flapPhase: Math.random() * Math.PI * 2,
            color: i % 2 === 0 ? "#48cae4" : "#ffb703"
        };
    });

    function drawButterfly(bf) {
        const wingScale = Math.abs(Math.sin(bf.flapPhase)) * 0.85 + 0.15;
        ctx.save();
        ctx.translate(bf.x, bf.y);
        ctx.rotate(bf.angle);
        ctx.scale(1, wingScale);
        ctx.fillStyle = bf.color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(-2, -5, 5, 0, Math.PI * 2);
        ctx.arc(-2, 5, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    const leafColors = ["#5fa85b", "#3f8746", "#7ec46b", "#96c95b", "#2e6b38"];
    const leaves = Array.from({ length: 20 }, function () {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: 8 + Math.random() * 8,
            speedY: 0.45 + Math.random() * 0.65,
            speedX: 0.2 + Math.random() * 0.4,
            swayAmp: 0.8 + Math.random() * 1.3,
            swaySpeed: 0.01 + Math.random() * 0.02,
            swayOffset: Math.random() * Math.PI * 2,
            angle: Math.random() * Math.PI * 2,
            spinSpeed: (Math.random() - 0.5) * 0.02,
            flip: Math.random() * Math.PI * 2,
            flipSpeed: 0.015 + Math.random() * 0.025,
            color: leafColors[Math.floor(Math.random() * leafColors.length)],
            opacity: 0.5 + Math.random() * 0.35
        };
    });

    const fireflies = Array.from({ length: 18 }, function () {
        return {
            x: Math.random() * width,
            y: Math.random() * (height - 100),
            radius: 2 + Math.random() * 2.2,
            vx: (Math.random() - 0.5) * 0.35,
            vy: -0.15 - Math.random() * 0.3,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            pulsePhase: Math.random() * Math.PI * 2
        };
    });

    function drawLeaf(leaf) {
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        ctx.scale(1, Math.cos(leaf.flip) * 0.75 + 0.25);
        ctx.globalAlpha = leaf.opacity;
        const s = leaf.size;
        ctx.fillStyle = leaf.color;
        ctx.beginPath();
        ctx.moveTo(-s, 0);
        ctx.quadraticCurveTo(0, -s * 0.75, s, 0);
        ctx.quadraticCurveTo(0, s * 0.75, -s, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawFirefly(fly) {
        const glow = (Math.sin(fly.pulsePhase) + 1) * 0.5;
        const alpha = 0.15 + glow * 0.7;
        const glowRadius = fly.radius * (3.2 + glow * 2.2);
        ctx.save();
        const grad = ctx.createRadialGradient(fly.x, fly.y, 0, fly.x, fly.y, glowRadius);
        grad.addColorStop(0, "rgba(255, 245, 150, " + alpha + ")");
        grad.addColorStop(0.4, "rgba(180, 255, 120, " + alpha * 0.5 + ")");
        grad.addColorStop(1, "rgba(180, 255, 120, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(fly.x, fly.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // =========================================================
    // 7. JUNGLE RIVER, SWIMMING FISH, LEAPING FISH & WATER SPLASHES
    // =========================================================
    let waveTime = 0;
    const riverDepth = 105;

    const fishPalettes = [
        { body: "#ff9f1c", fin: "#ffbf69", stripe: "#ffffff" }, // Golden Jungle Koi
        { body: "#00b4d8", fin: "#90e0ef", stripe: "#caf0f8" }, // Neon River Tetra
        { body: "#ff595e", fin: "#ffca3a", stripe: "#ffd166" }, // Coral Tropical Fish
        { body: "#52b788", fin: "#95d5b2", stripe: "#d8f3dc" }  // Emerald Stream Fish
    ];

    // Underwater Swimming Fish
    const fishes = Array.from({ length: 9 }, function (_, idx) {
        const dir = idx % 2 === 0 ? 1 : -1;
        return {
            x: Math.random() * width,
            depthOffset: 22 + Math.random() * (riverDepth - 42),
            vx: dir * (0.9 + Math.random() * 1.25),
            size: 11 + Math.random() * 6,
            tailPhase: Math.random() * Math.PI * 2,
            tailSpeed: 0.16 + Math.random() * 0.08,
            bobPhase: Math.random() * Math.PI * 2,
            palette: fishPalettes[idx % fishPalettes.length],
            dir: dir
        };
    });

    const bubbles = Array.from({ length: 18 }, function () {
        return {
            x: Math.random() * width,
            y: height - Math.random() * riverDepth,
            r: 1.5 + Math.random() * 2.8,
            vy: 0.35 + Math.random() * 0.45,
            wobble: Math.random() * Math.PI * 2
        };
    });

    // Jumping Fish, Water Splash Droplets & Expanding Surface Ripples
    const jumpingFishes = [];
    const splashDroplets = [];
    const splashRipples = [];
    let jumpSpawnTimer = 40;

    function getRiverSurfaceY(x) {
        const baseY = height - riverDepth + 14;
        return (
            baseY +
            Math.sin(x * 0.016 - waveTime * 1.25) * 6 +
            Math.sin(x * 0.032 + waveTime * 0.9) * 3
        );
    }

    // Create a burst of water droplets and expanding rings when a fish jumps or lands
    function createWaterSplash(x, y, dropletCount, power) {
        // Expanding water rings on the river surface
        splashRipples.push({
            x: x,
            y: y,
            rx: 5,
            ry: 2,
            maxRx: 36 * power,
            alpha: 0.85
        });

        // Airborne water droplets
        for (let i = 0; i < dropletCount; i++) {
            const spreadAngle = -Math.PI * 0.15 - Math.random() * (Math.PI * 0.7);
            const speed = (1.8 + Math.random() * 4.6) * power;
            splashDroplets.push({
                x: x + (Math.random() - 0.5) * 12,
                y: y,
                vx: Math.cos(spreadAngle) * speed * 0.85,
                vy: Math.sin(spreadAngle) * speed,
                gravity: 0.22,
                r: 1.6 + Math.random() * 2.4,
                alpha: 0.95
            });
        }
    }

    // Launch a fish leaping out of the water in a parabolic arc
    function spawnJumpingFish(customX) {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const startX =
            typeof customX === "number"
                ? customX
                : width * 0.12 + Math.random() * (width * 0.76);
        const startY = getRiverSurfaceY(startX) + 6;

        jumpingFishes.push({
            x: startX,
            y: startY,
            vx: dir * (2.6 + Math.random() * 1.6),
            vy: -(6.8 + Math.random() * 2.4), // Upward leap velocity
            gravity: 0.17,
            size: 13 + Math.random() * 5,
            tailPhase: 0,
            tailSpeed: 0.38, // Fast tail wag in mid-air
            palette: fishPalettes[Math.floor(Math.random() * fishPalettes.length)],
            dir: dir,
            hasLeftWater: false
        });

        // Initial splash as the fish bursts out of the river
        createWaterSplash(startX, startY - 4, 14, 0.9);
    }

    // Optional: Clicking anywhere triggers an extra jumping fish at that X position
    window.addEventListener("click", function (e) {
        if (jumpingFishes.length < 4) {
            spawnJumpingFish(e.clientX);
        }
    });

    function drawBackRiverWave() {
        const baseY = height - riverDepth;
        ctx.save();
        const grad = ctx.createLinearGradient(0, baseY - 15, 0, height);
        grad.addColorStop(0, "rgba(16, 95, 98, 0.42)");
        grad.addColorStop(1, "rgba(8, 48, 54, 0.72)");
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width + 20; x += 20) {
            const y =
                baseY +
                Math.sin(x * 0.012 + waveTime) * 7 +
                Math.cos(x * 0.025 - waveTime * 0.7) * 4;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    // Draw fish body (used for both underwater fish and airborne jumping fish)
    function renderFishShape(s, tailSwing, bodySway, palette, isJumping) {
        // Swinging Forked Tail Fin
        ctx.fillStyle = palette.fin;
        ctx.beginPath();
        ctx.moveTo(-s * 0.75, 0);
        ctx.lineTo(-s * 1.45, -s * 0.55 + tailSwing * 0.6);
        ctx.lineTo(-s * 1.15, tailSwing * 0.25);
        ctx.lineTo(-s * 1.45, s * 0.55 + tailSwing * 0.6);
        ctx.closePath();
        ctx.fill();

        // Top Dorsal Fin
        ctx.beginPath();
        ctx.moveTo(-s * 0.2, -s * 0.35);
        ctx.quadraticCurveTo(-s * 0.45, -s * 0.8, -s * 0.6, -s * 0.25);
        ctx.closePath();
        ctx.fill();

        // Streamlined Fish Body
        ctx.fillStyle = palette.body;
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.9, s * 0.46, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wet sunlight sheen on jumping fish
        if (isJumping) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.38)";
            ctx.beginPath();
            ctx.ellipse(s * 0.1, -s * 0.18, s * 0.55, s * 0.14, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Decorative Tropical Stripe
        ctx.strokeStyle = palette.stripe;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.arc(-s * 0.1, 0, s * 0.36, -Math.PI * 0.4, Math.PI * 0.4);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Side Pectoral Fin
        ctx.fillStyle = palette.fin;
        ctx.beginPath();
        ctx.ellipse(s * 0.1, s * 0.22, s * 0.28, s * 0.14, 0.4 + bodySway * 2, 0, Math.PI * 2);
        ctx.fill();

        // Fish Eye
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s * 0.48, -s * 0.1, s * 0.14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#102020";
        ctx.beginPath();
        ctx.arc(s * 0.52, -s * 0.1, s * 0.07, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawSwimmingFish(fish) {
        const y = height - fish.depthOffset + Math.sin(fish.bobPhase) * 5;
        const tailSwing = Math.sin(fish.tailPhase) * (fish.size * 0.45);
        const bodySway = Math.cos(fish.tailPhase) * 0.09;

        ctx.save();
        ctx.translate(fish.x, y);
        ctx.scale(fish.dir, 1);
        ctx.rotate(bodySway);
        renderFishShape(fish.size, tailSwing, bodySway, fish.palette, false);
        ctx.restore();
    }

    function drawJumpingFish(jFish) {
        const tailSwing = Math.sin(jFish.tailPhase) * (jFish.size * 0.55);
        const bodySway = Math.cos(jFish.tailPhase) * 0.08;
        // Rotate fish naturally along its parabolic flight trajectory
        const pitchAngle = Math.atan2(jFish.vy, Math.abs(jFish.vx));

        ctx.save();
        ctx.translate(jFish.x, jFish.y);
        ctx.scale(jFish.dir, 1);
        ctx.rotate(pitchAngle);
        renderFishShape(jFish.size, tailSwing, bodySway, jFish.palette, true);
        ctx.restore();
    }

    function drawFrontRiverWave() {
        const baseY = height - riverDepth + 14;
        ctx.save();

        const grad = ctx.createLinearGradient(0, baseY - 10, 0, height);
        grad.addColorStop(0, "rgba(38, 166, 154, 0.35)");
        grad.addColorStop(0.5, "rgba(17, 102, 102, 0.45)");
        grad.addColorStop(1, "rgba(7, 43, 51, 0.68)");
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width + 20; x += 18) {
            const y =
                baseY +
                Math.sin(x * 0.016 - waveTime * 1.25) * 6 +
                Math.sin(x * 0.032 + waveTime * 0.9) * 3;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Glowing water crest shimmer line
        ctx.strokeStyle = "rgba(180, 255, 245, 0.55)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let x = 0; x <= width + 20; x += 18) {
            const y =
                baseY +
                Math.sin(x * 0.016 - waveTime * 1.25) * 6 +
                Math.sin(x * 0.032 + waveTime * 0.9) * 3;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Rising underwater bubbles
        ctx.strokeStyle = "rgba(210, 255, 250, 0.6)";
        ctx.fillStyle = "rgba(210, 255, 250, 0.2)";
        ctx.lineWidth = 1;
        for (let i = 0; i < bubbles.length; i++) {
            const b = bubbles[i];
            b.wobble += 0.05;
            b.y -= b.vy;
            b.x += Math.sin(b.wobble) * 0.35;

            if (b.y < baseY + 6) {
                b.y = height - 5;
                b.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }

    // Update & Draw Splash Ripples and Water Droplets
    function updateAndDrawSplashes() {
        ctx.save();

        // 1. Expanding surface ripple rings
        for (let i = splashRipples.length - 1; i >= 0; i--) {
            const rp = splashRipples[i];
            rp.rx += 1.35;
            rp.ry += 0.32;
            rp.alpha -= 0.022;

            if (rp.alpha <= 0) {
                splashRipples.splice(i, 1);
                continue;
            }

            ctx.strokeStyle = "rgba(210, 255, 255, " + rp.alpha + ")";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(rp.x, rp.y, rp.rx, rp.ry, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 2. Flying water splash droplets
        for (let i = splashDroplets.length - 1; i >= 0; i--) {
            const d = splashDroplets[i];
            d.x += d.vx;
            d.y += d.vy;
            d.vy += d.gravity;
            d.alpha -= 0.018;

            const surfaceY = getRiverSurfaceY(d.x);
            if (d.alpha <= 0 || (d.vy > 0 && d.y > surfaceY + 8)) {
                splashDroplets.splice(i, 1);
                continue;
            }

            ctx.fillStyle = "rgba(215, 252, 255, " + d.alpha + ")";
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    // 8. MASTER 60FPS ANIMATION LOOP
    function animateJungle() {
        ctx.clearRect(0, 0, width, height);
        currentWind += (targetWind - currentWind) * 0.03;

        // Swinging Monkeys
        swingState.time += swingState.speed;
        const leftAngle = Math.sin(swingState.time) * swingState.maxAngle;
        const leftVel = Math.cos(swingState.time) * swingState.maxAngle;
        drawCanopyMonkey(Math.max(130, width * 0.14), -20, swingState.vineLength, leftAngle, leftVel, 1, true);

        const rightAngle = Math.cos(swingState.time * 1.15) * 0.55;
        const rightVel = -Math.sin(swingState.time * 1.15) * 0.55;
        drawCanopyMonkey(Math.min(width - 120, width * 0.86), -15, 185, rightAngle, rightVel, 0.88, false);

        // Tropical Birds
        for (let i = 0; i < birds.length; i++) {
            const b = birds[i];
            b.flapPhase += b.flapSpeed;
            b.x += b.vx + currentWind * 0.25;
            b.y += b.vy + Math.sin(b.flapPhase * 0.3) * 0.25;

            if (b.dir === 1 && b.x > width + 50) {
                b.x = -50;
                b.y = 40 + Math.random() * (height * 0.38);
            } else if (b.dir === -1 && b.x < -50) {
                b.x = width + 50;
                b.y = 40 + Math.random() * (height * 0.38);
            }
            drawBird(b);
        }

        // Butterflies
        for (let i = 0; i < butterflies.length; i++) {
            const bf = butterflies[i];
            bf.flapPhase += 0.28;
            bf.angle += (Math.random() - 0.5) * 0.08;
            bf.x += Math.cos(bf.angle) * bf.speed + currentWind * 0.3;
            bf.y += Math.sin(bf.angle) * bf.speed - 0.15;

            if (bf.x > width + 20) bf.x = -20;
            if (bf.x < -20) bf.x = width + 20;
            if (bf.y < -20) bf.y = height - 140;
            if (bf.y > height - 120) bf.y = -20;

            drawButterfly(bf);
        }

        // Fireflies
        for (let i = 0; i < fireflies.length; i++) {
            const f = fireflies[i];
            f.pulsePhase += f.pulseSpeed;
            f.x += f.vx + Math.sin(f.pulsePhase * 0.7) * 0.25 + currentWind * 0.2;
            f.y += f.vy + Math.cos(f.pulsePhase * 0.5) * 0.15;

            if (f.y < -20) f.y = height - 110;
            if (f.x > width + 20) f.x = -20;
            if (f.x < -20) f.x = width + 20;
            drawFirefly(f);
        }

        // 3D Tumbling Leaves
        for (let i = 0; i < leaves.length; i++) {
            const l = leaves[i];
            l.swayOffset += l.swaySpeed;
            l.flip += l.flipSpeed;
            l.angle += l.spinSpeed + Math.cos(l.swayOffset) * 0.005;
            l.x += currentWind * l.speedX + Math.sin(l.swayOffset) * l.swayAmp;
            l.y += l.speedY;

            if (l.y > height + 30) {
                l.y = -25;
                l.x = Math.random() * width;
            }
            if (l.x > width + 30) l.x = -25;
            if (l.x < -30) l.x = width + 25;
            drawLeaf(l);
        }

        // Jungle River & Underwater Swimming Fish
        waveTime += 0.035;
        drawBackRiverWave();

        for (let i = 0; i < fishes.length; i++) {
            const fish = fishes[i];
            fish.tailPhase += fish.tailSpeed;
            fish.bobPhase += 0.04;
            fish.x += fish.vx;

            if (fish.dir === 1 && fish.x > width + 40) {
                fish.x = -40;
            } else if (fish.dir === -1 && fish.x < -40) {
                fish.x = width + 40;
            }

            drawSwimmingFish(fish);
        }

        // Periodically spawn a fish jumping out of the river
        jumpSpawnTimer--;
        if (jumpSpawnTimer <= 0) {
            spawnJumpingFish();
            jumpSpawnTimer = 75 + Math.floor(Math.random() * 65);
        }

        // Update & draw airborne Jumping Fish
        for (let i = jumpingFishes.length - 1; i >= 0; i--) {
            const jf = jumpingFishes[i];
            jf.x += jf.vx;
            jf.y += jf.vy;
            jf.vy += jf.gravity;
            jf.tailPhase += jf.tailSpeed;

            // Fine mist droplets trailing off the leaping fish in mid-air
            if (Math.random() < 0.35) {
                splashDroplets.push({
                    x: jf.x,
                    y: jf.y,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: Math.random() * 0.5,
                    gravity: 0.18,
                    r: 1.3,
                    alpha: 0.7
                });
            }

            const surfaceY = getRiverSurfaceY(jf.x);
            if (jf.y < surfaceY) {
                jf.hasLeftWater = true;
            }

            // When the fish dives back into the water, trigger a big splash!
            if (jf.hasLeftWater && jf.vy > 0 && jf.y >= surfaceY + 4) {
                createWaterSplash(jf.x, surfaceY, 22, 1.25);
                jumpingFishes.splice(i, 1);
                continue;
            }

            drawJumpingFish(jf);
        }

        drawFrontRiverWave();
        updateAndDrawSplashes();

        requestAnimationFrame(animateJungle);
    }

    requestAnimationFrame(animateJungle);
})();

/* =========================================================
   WORLD BADGES & "MASTER OF ALL FOUR WORLDS" TRANSITION ENGINE
   ========================================================= */
(function initWorldBadgeSystem() {
    const LANGUAGES = ["Python", "C", "CPP", "Java"];

    // Specific Badge Definitions for Each Language & All 4 Worlds
    const BADGE_INFO = {
        Python: {
            key: "codequestBadge_Python",
            name: "PYTHON MASTER",
            ribbon: "PYTHON WORLD",
            icon: "🐍👑",
            themeClass: "badge-theme-Python",
            desc: "You conquered all Python Jungle challenges and mastered Python programming!"
        },
        C: {
            key: "codequestBadge_C",
            name: "C MASTER",
            ribbon: "C WORLD",
            icon: "💻🏛️",
            themeClass: "badge-theme-C",
            desc: "You unlocked the secrets of the Ancient Ruins and mastered C programming!"
        },
        CPP: {
            key: "codequestBadge_CPP",
            name: "C++ MASTER",
            ribbon: "C++ WORLD",
            icon: "⚔️🏰",
            themeClass: "badge-theme-CPP",
            desc: "You triumphed over the Emerald Citadel and mastered C++ programming!"
        },
        Java: {
            key: "codequestBadge_Java",
            name: "JAVA MASTER",
            ribbon: "JAVA WORLD",
            icon: "☕🏝️",
            themeClass: "badge-theme-Java",
            desc: "You sailed across the Island of Objects and mastered Java programming!"
        },
        MASTER: {
            key: "codequestBadge_MasterAllFour",
            name: "MASTER OF ALL FOUR WORLDS",
            ribbon: "SUPREME GRANDMASTER",
            icon: "👑🌍✨",
            themeClass: "badge-theme-MASTER",
            desc: "Legendary achievement! You completed Python, C, C++, and Java Worlds to become the Master of All Four Worlds!"
        }
    };

    let activeLang = "Python";
    let activeLvl = "1";
    const ceremonyQueue = [];
    let isCeremonyShowing = false;

    // 1. Create the Fullscreen Animated Transition Overlay
    const overlay = document.createElement("div");
    overlay.id = "badgeCeremonyOverlay";
    overlay.className = "badge-ceremony-overlay";
    overlay.innerHTML =
        '<div class="badge-stage-wrapper">' +
            '<div class="badge-sunburst"></div>' +
            '<p class="ceremony-header" id="ceremonyHeader">✨ WORLD COMPLETED! ✨</p>' +
            '<div class="animated-badge-medal badge-theme-Python" id="ceremonyMedal">' +
                '<span class="badge-medal-icon" id="ceremonyIcon">🐍👑</span>' +
                '<span class="badge-medal-ribbon" id="ceremonyRibbon">PYTHON WORLD</span>' +
            '</div>' +
            '<h2 class="ceremony-badge-title" id="ceremonyTitle">PYTHON MASTER</h2>' +
            '<p class="ceremony-badge-desc" id="ceremonyDesc"></p>' +
            '<button type="button" class="ceremony-claim-btn" id="ceremonyClaimBtn">🎖️ COLLECT BADGE & CONTINUE</button>' +
        '</div>';
    document.body.appendChild(overlay);

    // 2. Check if a World is Completed (All 10 levels done OR Final Level 10 completed)
    function checkWorldComplete(lang) {
        let allTenDone = true;
        for (let i = 1; i <= 10; i++) {
            if (localStorage.getItem("codequest" + lang + "Level" + i + "Completed") !== "true") {
                allTenDone = false;
                break;
            }
        }
        const levelTenDone = localStorage.getItem("codequest" + lang + "Level10Completed") === "true";
        return allTenDone || levelTenDone || localStorage.getItem(BADGE_INFO[lang].key) === "true";
    }

    function checkAllFourWorldsComplete() {
        return LANGUAGES.every(function (lang) {
            return checkWorldComplete(lang);
        });
    }

    // 3. Queue and Play Smooth Badge Unlock Transitions One by One
    function triggerBadgeCeremony(badgeObj, isGrandMaster) {
        ceremonyQueue.push({ badge: badgeObj, isGrandMaster: isGrandMaster });
        if (!isCeremonyShowing) {
            playNextCeremony();
        }
    }

    function playNextCeremony() {
        if (ceremonyQueue.length === 0) {
            isCeremonyShowing = false;
            overlay.classList.remove("active");
            renderAllTrophyCases();
            updateAchievementScreenBadge();
            return;
        }

        isCeremonyShowing = true;
        const item = ceremonyQueue.shift();
        const b = item.badge;

        const headerEl = document.getElementById("ceremonyHeader");
        const medalEl = document.getElementById("ceremonyMedal");
        const iconEl = document.getElementById("ceremonyIcon");
        const ribbonEl = document.getElementById("ceremonyRibbon");
        const titleEl = document.getElementById("ceremonyTitle");
        const descEl = document.getElementById("ceremonyDesc");
        const btnEl = document.getElementById("ceremonyClaimBtn");

        headerEl.textContent = item.isGrandMaster
            ? "🌟 ULTIMATE GRANDMASTER ACHIEVEMENT! 🌟"
            : "🎉 LANGUAGE WORLD CONQUERED! 🎉";

        medalEl.className = "animated-badge-medal " + b.themeClass;
        iconEl.textContent = b.icon;
        ribbonEl.textContent = b.ribbon;
        titleEl.textContent = "🏆 " + b.name;
        descEl.textContent = b.desc;
        btnEl.textContent =
            ceremonyQueue.length > 0
                ? "✨ UNVEIL ULTIMATE MASTER BADGE ▶"
                : "🎖️ COLLECT BADGE & CONTINUE";

        // Smoothly transition into the ceremony
        overlay.classList.remove("active");
        setTimeout(function () {
            overlay.classList.add("active");
        }, 40);
    }

    document.getElementById("ceremonyClaimBtn").addEventListener("click", function () {
        overlay.classList.remove("active");
        setTimeout(function () {
            playNextCeremony();
        }, 380);
    });

    // 4. Build & Update the Trophy Case on Language Screen & Achievement Screen
    function buildTrophyCaseHTML() {
        let html = '<h3 class="trophy-case-title">🏆 WORLD BADGE TROPHY CASE</h3><div class="trophy-badges-grid">';

        LANGUAGES.forEach(function (lang) {
            const b = BADGE_INFO[lang];
            const unlocked = checkWorldComplete(lang);
            html +=
                '<div class="trophy-slot ' + (unlocked ? "unlocked" : "locked") + '">' +
                    '<div class="trophy-mini-medal ' + (unlocked ? b.themeClass : "") + '">' +
                        (unlocked ? b.icon : "🔒") +
                    '</div>' +
                    '<span class="trophy-name">' + b.name + '</span>' +
                '</div>';
        });

        const masterUnlocked = checkAllFourWorldsComplete();
        const mb = BADGE_INFO.MASTER;
        html +=
            '<div class="trophy-slot master-slot ' + (masterUnlocked ? "unlocked" : "locked") + '">' +
                '<div class="trophy-mini-medal ' + (masterUnlocked ? mb.themeClass : "") + '">' +
                    (masterUnlocked ? mb.icon : "🔒") +
                '</div>' +
                '<span class="trophy-name">👑 ' + mb.name + '</span>' +
            '</div></div>';

        return html;
    }

    function renderAllTrophyCases() {
        const languageScreen = document.getElementById("languageScreen");
        const achievementScreen = document.getElementById("achievementScreen");

        [languageScreen, achievementScreen].forEach(function (screen) {
            if (!screen) return;
            let box = screen.querySelector(".badge-trophy-case");
            if (!box) {
                box = document.createElement("div");
                box.className = "badge-trophy-case";
                const backBtn = screen.querySelector(".back-button");
                if (backBtn) {
                    screen.insertBefore(box, backBtn);
                } else {
                    screen.appendChild(box);
                }
            }
            box.innerHTML = buildTrophyCaseHTML();
        });
    }

    // 5. Upgrade the Achievement Screen Card with the Active World's Animated Badge
    function updateAchievementScreenBadge() {
        const achievementScreen = document.getElementById("achievementScreen");
        if (!achievementScreen) return;
        const card = achievementScreen.querySelector(".world-card");
        if (!card) return;

        const isMaster = checkAllFourWorldsComplete();
        const badgeToDisplay = isMaster ? BADGE_INFO.MASTER : BADGE_INFO[activeLang] || BADGE_INFO.Python;

        let medalBox = card.querySelector(".animated-badge-medal");
        if (!medalBox) {
            medalBox = document.createElement("div");
            card.insertBefore(medalBox, card.firstChild);
        }
        medalBox.className = "animated-badge-medal " + badgeToDisplay.themeClass;
        medalBox.innerHTML =
            '<span class="badge-medal-icon">' + badgeToDisplay.icon + '</span>' +
            '<span class="badge-medal-ribbon">' + badgeToDisplay.ribbon + '</span>';

        const descTitle = card.querySelector(".language-description");
        if (descTitle) {
            descTitle.textContent = "🎖️ " + badgeToDisplay.name;
        }
    }

    // 6. Track Active Language & Level and Trigger Transition Upon World Completion
    document.querySelectorAll(".language-card").forEach(function (card) {
        card.addEventListener("click", function () {
            if (card.dataset.language) activeLang = card.dataset.language;
            renderAllTrophyCases();
        });
    });

    document.querySelectorAll(".level-button[data-language]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            activeLang = btn.dataset.language || "Python";
            activeLvl = btn.dataset.level || "1";
        });
    });

    // Detect when the player claims a World Achievement or finishes a World
    const nextLevelBtn = document.getElementById("nextLevelButton");
    if (nextLevelBtn) {
        nextLevelBtn.addEventListener("click", function () {
            // Check after the click handler updates currentLevel/screen
            setTimeout(function () {
                const achievementScreen = document.getElementById("achievementScreen");
                const onAchievementScreen = achievementScreen && !achievementScreen.hidden;

                if (onAchievementScreen || checkWorldComplete(activeLang)) {
                    const langBadge = BADGE_INFO[activeLang];
                    if (langBadge && checkWorldComplete(activeLang)) {
                        localStorage.setItem(langBadge.key, "true");
                        triggerBadgeCeremony(langBadge, false);
                    }

                    if (checkAllFourWorldsComplete()) {
                        localStorage.setItem(BADGE_INFO.MASTER.key, "true");
                        triggerBadgeCeremony(BADGE_INFO.MASTER, true);
                    }

                    updateAchievementScreenBadge();
                    renderAllTrophyCases();
                }
            }, 60);
        });
    }

    // Sync with Reset Progress button so badges reset cleanly when progress is cleared
    document.querySelectorAll(".reset-progress-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            LANGUAGES.forEach(function (lang) {
                localStorage.removeItem(BADGE_INFO[lang].key);
            });
            localStorage.removeItem(BADGE_INFO.MASTER.key);
            setTimeout(renderAllTrophyCases, 50);
        });
    });

    // Initial render on page load
    renderAllTrophyCases();
    updateAchievementScreenBadge();
})();

/* =========================================================
   CODEMASTER LEVEL SKIPPING & WORLD-TO-WORLD BIG LEAP ENGINE
   ========================================================= */
(function initCodemasterPathwayTransitions() {
    const WORLD_ORDER = ["Python", "C", "CPP", "Java"];
    const WORLD_META = {
        Python: { title: "PYTHON WORLD", symbol: "🐍", short: "PYTHON" },
        C:      { title: "C WORLD",      symbol: "💻", short: "C" },
        CPP:    { title: "C++ WORLD",    symbol: "⚔️", short: "C++" },
        Java:   { title: "JAVA WORLD",   symbol: "☕", short: "JAVA" }
    };

    let trackedLang = "Python";
    let trackedLevel = 1;

    // 1. Create the Reusable Pathway & World-Leap Overlay
    const overlay = document.createElement("div");
    overlay.id = "pathwayTransitionOverlay";
    overlay.className = "pathway-transition-overlay";
    document.body.appendChild(overlay);

    // Track which language and level the player is currently playing
    document.querySelectorAll(".language-card").forEach(function (card) {
        card.addEventListener("click", function () {
            if (card.dataset.language) trackedLang = card.dataset.language;
        });
    });

    document.querySelectorAll(".level-button[data-language]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (btn.dataset.language) trackedLang = btn.dataset.language;
            if (btn.dataset.level) trackedLevel = Number(btn.dataset.level);
        });
    });

    // Helper: Detect active language & level directly from #lessonTitle before transition
    function syncStateFromLessonTitle() {
        const titleEl = document.getElementById("lessonTitle");
        if (!titleEl) return;
        const txt = titleEl.textContent || "";

        if (txt.indexOf("PYTHON") !== -1) trackedLang = "Python";
        else if (txt.indexOf("C++") !== -1) trackedLang = "CPP";
        else if (txt.indexOf("JAVA") !== -1) trackedLang = "Java";
        else if (txt.indexOf("C LEVEL") !== -1) trackedLang = "C";

        const match = txt.match(/LEVEL\s+(\d+)/i);
        if (match && match[1]) {
            trackedLevel = Number(match[1]);
        }
    }

    // Spawn a trail of glowing code/magic sparkles along the Codemaster's jump path
    function spawnSparkleTrail(container, startLeftPct, endLeftPct, durationMs, isHighArc) {
        const steps = 10;
        const symbols = ["✨", "⭐", "⚡", "🌿"];
        for (let i = 1; i <= steps; i++) {
            setTimeout(function () {
                if (!overlay.classList.contains("active")) return;
                const progress = i / steps;
                const leftPct = startLeftPct + (endLeftPct - startLeftPct) * progress;
                const arcHeight = isHighArc
                    ? Math.sin(progress * Math.PI) * 130
                    : Math.abs(Math.sin(progress * Math.PI * 2)) * 28;

                const sp = document.createElement("span");
                sp.className = "codemaster-sparkle";
                sp.textContent = symbols[i % symbols.length];
                sp.style.left = leftPct + "%";
                sp.style.top = "calc(52% - " + arcHeight + "px)";
                container.appendChild(sp);

                setTimeout(function () {
                    sp.remove();
                }, 700);
            }, (durationMs / steps) * i);
        }
    }

    // =========================================================
    // A. LEVEL-TO-LEVEL SKIPPING PATHWAY (LEVEL N -> LEVEL N+1)
    // =========================================================
    function playLevelSkipTransition(lang, fromLvl, toLvl) {
        const meta = WORLD_META[lang] || WORLD_META.Python;

        let stonesHTML = "";
        for (let i = 1; i <= 10; i++) {
            const doneClass = i <= fromLvl ? "stone-completed" : "";
            stonesHTML +=
                '<div class="path-stone ' + doneClass + '" data-stone="' + i + '">' +
                    '<span>' + i + '</span>' +
                '</div>';
        }

        const startPct = ((fromLvl - 0.5) / 10) * 100;
        const endPct = ((toLvl - 0.5) / 10) * 100;

        overlay.innerHTML =
            '<h2 class="pathway-title">' + meta.symbol + ' ' + meta.title + ' PATHWAY</h2>' +
            '<p class="pathway-subtitle" id="pathwayStatusText">🧙‍♂️ Codemaster is skipping from Level ' + fromLvl + ' to Level ' + toLvl + '...</p>' +
            '<div class="level-pathway-map" id="levelPathwayMap">' +
                stonesHTML +
                '<div class="codemaster-traveler" id="codemasterAvatar" style="left: ' + startPct + '%;">' +
                    '<span class="codemaster-sprite">🧙‍♂️' + meta.symbol + '</span>' +
                    '<span class="codemaster-tag">CODEMASTER</span>' +
                '</div>' +
            '</div>' +
            '<div class="pathway-actions">' +
                '<button type="button" class="pathway-action-btn" id="skipPathwayBtn">▶ CONTINUE TO LEVEL ' + toLvl + '</button>' +
            '</div>';

        overlay.classList.add("active");

        const mapEl = document.getElementById("levelPathwayMap");
        const avatarEl = document.getElementById("codemasterAvatar");
        const targetStone = mapEl.querySelector('.path-stone[data-stone="' + toLvl + '"]');
        const statusText = document.getElementById("pathwayStatusText");

        // Trigger the joyful skipping hop across the stones
        setTimeout(function () {
            if (!avatarEl) return;
            avatarEl.classList.add("skipping");
            avatarEl.style.left = endPct + "%";
            spawnSparkleTrail(mapEl, startPct, endPct, 1100, false);
        }, 80);

        // Highlight destination stone with shockwave on landing
        setTimeout(function () {
            if (targetStone) {
                targetStone.classList.add("stone-target-glow");
                const wave = document.createElement("div");
                wave.className = "leap-shockwave";
                targetStone.appendChild(wave);
            }
            if (statusText) {
                statusText.textContent = "✨ Arrived at Level " + toLvl + "! Get ready, Codemaster!";
            }
        }, 1220);

        // Auto-close after 2.2 seconds or when button is clicked
        const closeTimer = setTimeout(function () {
            overlay.classList.remove("active");
        }, 2250);

        const skipBtn = document.getElementById("skipPathwayBtn");
        if (skipBtn) {
            skipBtn.addEventListener("click", function () {
                clearTimeout(closeTimer);
                overlay.classList.remove("active");
            });
        }
    }

    // =========================================================
    // B. WORLD-TO-WORLD BIG LEAP (PYTHON 🐍 -> C 💻 -> C++ ⚔️ -> JAVA ☕)
    // =========================================================
    function getNextTargetWorld(currentLang) {
        const idx = WORLD_ORDER.indexOf(currentLang);
        // Prefer the next world in sequence
        return WORLD_ORDER[(idx + 1) % WORLD_ORDER.length];
    }

    function playWorldBigLeapTransition(fromLang) {
        const toLang = getNextTargetWorld(fromLang);
        const fromMeta = WORLD_META[fromLang] || WORLD_META.Python;
        const toMeta = WORLD_META[toLang] || WORLD_META.C;

        const fromIdx = WORLD_ORDER.indexOf(fromLang);
        const toIdx = WORLD_ORDER.indexOf(toLang);

        const startPct = ((fromIdx + 0.5) / 4) * 100;
        const endPct = ((toIdx + 0.5) / 4) * 100;

        let islandsHTML = "";
        WORLD_ORDER.forEach(function (langKey) {
            const m = WORLD_META[langKey];
            const isOrigin = langKey === fromLang ? "island-origin" : "";
            islandsHTML +=
                '<div class="world-island-node ' + isOrigin + '" data-world-node="' + langKey + '">' +
                    '<div class="island-symbol-orb">' + m.symbol + '</div>' +
                    '<span class="island-title-label">' + m.short + ' WORLD</span>' +
                '</div>';
        });

        overlay.innerHTML =
            '<h2 class="pathway-title">🌟 WORLD CONQUERED: THE BIG LEAP! 🌟</h2>' +
            '<p class="pathway-subtitle" id="worldLeapStatus">' +
                '🧙‍♂️ Codemaster is leaping from ' + fromMeta.symbol + ' ' + fromMeta.title + ' to ' + toMeta.symbol + ' ' + toMeta.title + '!' +
            '</p>' +
            '<div class="world-leap-map" id="worldLeapMap">' +
                islandsHTML +
                '<div class="codemaster-traveler" id="codemasterWorldLeaper" style="left: ' + startPct + '%; top: 62%;">' +
                    '<span class="codemaster-sprite">🧙‍♂️🚀</span>' +
                    '<span class="codemaster-tag">' + fromMeta.symbol + ' ➔ ' + toMeta.symbol + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="pathway-actions">' +
                '<button type="button" class="pathway-action-btn" id="jumpToNextWorldBtn">' +
                    '🚀 ENTER ' + toMeta.symbol + ' ' + toMeta.title + ' NOW' +
                '</button>' +
                '<button type="button" class="pathway-action-btn secondary" id="closeWorldLeapBtn">' +
                    '🏆 VIEW TROPHY & WORLD MAP' +
                '</button>' +
            '</div>';

        overlay.classList.add("active");

        const mapEl = document.getElementById("worldLeapMap");
        const leaperEl = document.getElementById("codemasterWorldLeaper");
        const destIsland = mapEl.querySelector('.world-island-node[data-world-node="' + toLang + '"]');
        const statusEl = document.getElementById("worldLeapStatus");

        // Launch the high-altitude parabolic leap across the world symbols
        setTimeout(function () {
            if (!leaperEl) return;
            leaperEl.classList.add("big-leaping");
            leaperEl.style.left = endPct + "%";
            spawnSparkleTrail(mapEl, startPct, endPct, 1600, true);
        }, 120);

        // Impact shockwave on the destination World Symbol
        setTimeout(function () {
            if (destIsland) {
                destIsland.classList.add("island-destination-impact");
                const wave = document.createElement("div");
                wave.className = "leap-shockwave";
                destIsland.appendChild(wave);
            }
            if (leaperEl) {
                const sprite = leaperEl.querySelector(".codemaster-sprite");
                if (sprite) sprite.textContent = "🧙‍♂️" + toMeta.symbol;
            }
            if (statusEl) {
                statusEl.textContent =
                    "⚡ LANDED IN " + toMeta.symbol + " " + toMeta.title + "! Ready for your next coding quest!";
            }
        }, 1720);

        // Button 1: Teleport directly into the destination World
        const jumpBtn = document.getElementById("jumpToNextWorldBtn");
        if (jumpBtn) {
            jumpBtn.addEventListener("click", function () {
                overlay.classList.remove("active");
                const badgeOverlay = document.getElementById("badgeCeremonyOverlay");
                if (badgeOverlay) badgeOverlay.classList.remove("active");

                const targetCard = document.querySelector('.language-card[data-language="' + toLang + '"]');
                if (targetCard) {
                    targetCard.click();
                }
            });
        }

        // Button 2: Close leap overlay to view Achievement / Trophy screen
        const closeBtn = document.getElementById("closeWorldLeapBtn");
        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                overlay.classList.remove("active");
            });
        }
    }

    // =========================================================
    // C. HOOK INTO LEVEL COMPLETION & WORLD BADGE CEREMONY
    // =========================================================
    document.addEventListener(
        "click",
        function (e) {
            const nextBtn = e.target.closest("#nextLevelButton");
            if (nextBtn) {
                syncStateFromLessonTitle();
                if (trackedLevel < 10) {
                    // Level 1..9 completed: Show Codemaster skipping to the next level stone!
                    playLevelSkipTransition(trackedLang, trackedLevel, trackedLevel + 1);
                } else {
                    // Level 10 completed: If badge ceremony overlay is NOT present, play World Big Leap immediately
                    if (!document.getElementById("badgeCeremonyOverlay")) {
                        playWorldBigLeapTransition(trackedLang);
                    }
                }
            }

            // When the player finishes collecting their World Badge in the ceremony, launch the Big World Leap!
            const claimBtn = e.target.closest("#ceremonyClaimBtn");
            if (claimBtn) {
                setTimeout(function () {
                    const badgeOverlay = document.getElementById("badgeCeremonyOverlay");
                    const ceremonyFinished = !badgeOverlay || !badgeOverlay.classList.contains("active");
                    if (ceremonyFinished) {
                        playWorldBigLeapTransition(trackedLang);
                    }
                }, 420);
            }
        },
        true // Capture phase so we read the exact level number before the screen switches
    );
})();

/* =========================================================
   PERSISTENT CURRENT BADGES BAR ENGINE
   ========================================================= */
(function initCurrentBadgesBar() {
    const LANGUAGES = ["Python", "C", "CPP", "Java"];

    const BAR_BADGES = [
        {
            id: "Python",
            key: "codequestBadge_Python",
            shortLabel: "Python Master",
            icon: "🐍",
            fullIcon: "🐍👑",
            ribbon: "PYTHON WORLD",
            themeClass: "badge-theme-Python",
            desc: "You conquered all Python Jungle challenges and mastered Python programming!"
        },
        {
            id: "C",
            key: "codequestBadge_C",
            shortLabel: "C Master",
            icon: "💻",
            fullIcon: "💻🏛️",
            ribbon: "C WORLD",
            themeClass: "badge-theme-C",
            desc: "You unlocked the secrets of the Ancient Ruins and mastered C programming!"
        },
        {
            id: "CPP",
            key: "codequestBadge_CPP",
            shortLabel: "C++ Master",
            icon: "⚔️",
            fullIcon: "⚔️🏰",
            ribbon: "C++ WORLD",
            themeClass: "badge-theme-CPP",
            desc: "You triumphed over the Emerald Citadel and mastered C++ programming!"
        },
        {
            id: "Java",
            key: "codequestBadge_Java",
            shortLabel: "Java Master",
            icon: "☕",
            fullIcon: "☕🏝️",
            ribbon: "JAVA WORLD",
            themeClass: "badge-theme-Java",
            desc: "You sailed across the Island of Objects and mastered Java programming!"
        },
        {
            id: "MASTER",
            key: "codequestBadge_MasterAllFour",
            shortLabel: "Master of All 4 Worlds",
            icon: "👑",
            fullIcon: "👑🌍✨",
            ribbon: "SUPREME GRANDMASTER",
            themeClass: "badge-theme-MASTER",
            desc: "Legendary achievement! You completed Python, C, C++, and Java Worlds to become the Master of All Four Worlds!"
        }
    ];

    // Check if a language world is completed
    function isLangWorldUnlocked(lang) {
        if (localStorage.getItem("codequestBadge_" + lang) === "true") return true;
        if (localStorage.getItem("codequest" + lang + "Level10Completed") === "true") return true;
        for (let i = 1; i <= 10; i++) {
            if (localStorage.getItem("codequest" + lang + "Level" + i + "Completed") !== "true") {
                return false;
            }
        }
        return true;
    }

    function isBadgeUnlocked(badgeId) {
        if (badgeId === "MASTER") {
            return (
                localStorage.getItem("codequestBadge_MasterAllFour") === "true" ||
                LANGUAGES.every(isLangWorldUnlocked)
            );
        }
        return isLangWorldUnlocked(badgeId);
    }

    // Create the persistent top Current Badges Bar
    let badgesBar = document.getElementById("currentBadgesBar");
    if (!badgesBar) {
        badgesBar = document.createElement("nav");
        badgesBar.id = "currentBadgesBar";
        badgesBar.className = "current-badges-bar";
        badgesBar.setAttribute("aria-label", "Current Unlocked Badges");

        const firstScreen = document.querySelector(".home-screen");
        if (firstScreen && firstScreen.parentNode) {
            firstScreen.parentNode.insertBefore(badgesBar, firstScreen);
        } else {
            document.body.prepend(badgesBar);
        }
    }

    // Open the 3D Badge Ceremony Overlay when the user clicks an unlocked badge in the bar
    function previewUnlockedBadge(badge) {
        const overlay = document.getElementById("badgeCeremonyOverlay");
        if (!overlay) return;

        const headerEl = document.getElementById("ceremonyHeader");
        const medalEl = document.getElementById("ceremonyMedal");
        const iconEl = document.getElementById("ceremonyIcon");
        const ribbonEl = document.getElementById("ceremonyRibbon");
        const titleEl = document.getElementById("ceremonyTitle");
        const descEl = document.getElementById("ceremonyDesc");
        const btnEl = document.getElementById("ceremonyClaimBtn");

        if (headerEl) headerEl.textContent = "🎖️ UNLOCKED BADGE SHOWCASE 🎖️";
        if (medalEl) medalEl.className = "animated-badge-medal " + badge.themeClass;
        if (iconEl) iconEl.textContent = badge.fullIcon;
        if (ribbonEl) ribbonEl.textContent = badge.ribbon;
        if (titleEl) titleEl.textContent = "🏆 " + badge.shortLabel.toUpperCase();
        if (descEl) descEl.textContent = badge.desc;
        if (btnEl) btnEl.textContent = "✨ CLOSE SHOWCASE";

        overlay.classList.add("active");
    }

    // Render/Update the Current Badges Bar
    function updateCurrentBadgesBar() {
        let unlockedTotal = 0;
        let pillsHTML = "";

        BAR_BADGES.forEach(function (b) {
            const unlocked = isBadgeUnlocked(b.id);
            if (unlocked) unlockedTotal++;

            pillsHTML +=
                '<span class="badge-bar-pill pill-' + b.id + " " + (unlocked ? "unlocked" : "locked") + '" ' +
                    'data-badge-id="' + b.id + '" ' +
                    'title="' + (unlocked ? "Click to inspect " + b.shortLabel : "Complete " + b.ribbon + " to unlock!") + '">' +
                    '<span>' + (unlocked ? b.icon : "🔒") + '</span>' +
                    '<span>' + b.shortLabel + '</span>' +
                '</span>';
        });

        badgesBar.innerHTML =
            '<div class="badges-bar-header">' +
                '<span>🎖️ MY BADGES (' + unlockedTotal + ' / 5):</span>' +
            '</div>' +
            '<div class="badges-bar-list">' +
                pillsHTML +
            '</div>';

        // Allow clicking any unlocked badge pill to inspect its 3D medal
        badgesBar.querySelectorAll(".badge-bar-pill.unlocked").forEach(function (pill) {
            pill.addEventListener("click", function () {
                const id = pill.getAttribute("data-badge-id");
                const found = BAR_BADGES.find(function (item) {
                    return item.id === id;
                });
                if (found) previewUnlockedBadge(found);
            });
        });
    }

    // Initial render on page load
    updateCurrentBadgesBar();

    // Automatically refresh the bar whenever any quiz option, level button, or reset button is clicked
    document.addEventListener("click", function () {
        setTimeout(updateCurrentBadgesBar, 80);
    });
})();

/* =========================================================
   8-BIT RETRO SOUND ENGINE (CLICKS, LEVEL SKIP & WORLD LEAP)
   ========================================================= */
(function initCodeQuestSoundEngine() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    let ctx = null;
    let soundEnabled = localStorage.getItem("codequestSoundMuted") !== "true";

    function getAudioCtx() {
        if (!ctx) {
            ctx = new AudioCtx();
        }
        if (ctx.state === "suspended") {
            ctx.resume();
        }
        return ctx;
    }

    // Inject a 🔊 SOUND: ON / OFF button into the top Current Badges Bar
    function injectSoundToggleButton() {
        const badgesBar = document.getElementById("currentBadgesBar");
        if (!badgesBar || badgesBar.querySelector(".sound-toggle-btn")) return;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sound-toggle-btn" + (soundEnabled ? "" : " muted");
        btn.textContent = soundEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";

        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            soundEnabled = !soundEnabled;
            localStorage.setItem("codequestSoundMuted", !soundEnabled);
            btn.className = "sound-toggle-btn" + (soundEnabled ? "" : " muted");
            btn.textContent = soundEnabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
            if (soundEnabled) playClickSound();
        });

        badgesBar.appendChild(btn);
    }

    injectSoundToggleButton();

    // Core helper: Play a synthesized 8-bit tone or frequency sweep
    function playTone(freq, type, duration, delay, vol, slideToFreq) {
        if (!soundEnabled) return;
        const audio = getAudioCtx();
        const start = audio.currentTime + (delay || 0);
        const stop = start + duration;

        const osc = audio.createOscillator();
        const gain = audio.createGain();

        osc.type = type || "square";
        osc.frequency.setValueAtTime(freq, start);
        if (slideToFreq) {
            osc.frequency.exponentialRampToValueAtTime(slideToFreq, stop);
        }

        const peakVol = vol || 0.08;
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(peakVol, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0008, stop);

        osc.connect(gain);
        gain.connect(audio.destination);

        osc.start(start);
        osc.stop(stop + 0.01);
    }

    // 1. Standard Button Click (Crisp 8-Bit Arcade Blip)
    function playClickSound() {
        playTone(520, "triangle", 0.055, 0, 0.09, 780);
    }

    // 2. Navigation Back / Reset Button Click (Soft Downward Blip)
    function playBackSound() {
        playTone(480, "triangle", 0.065, 0, 0.08, 300);
    }

    // 3. Language World Card Select (Jungle Drum + Chime)
    function playWorldSelectSound() {
        playTone(180, "sine", 0.11, 0, 0.14, 90);
        playTone(523.25, "triangle", 0.09, 0.05, 0.09); // C5
        playTone(659.25, "triangle", 0.14, 0.12, 0.09); // E5
    }

    // 4. Quiz Wrong Answer (Retro Descending Buzzer)
    function playWrongAnswerSound() {
        playTone(210, "sawtooth", 0.14, 0, 0.08, 165);
        playTone(155, "sawtooth", 0.22, 0.13, 0.08, 115);
    }

    // 5. Quiz Correct Answer + 10 XP Gain (Ascending Coin / Star Chime)
    function playCorrectXPSound() {
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach(function (n, idx) {
            playTone(n, "square", 0.11, idx * 0.065, 0.065);
        });
    }

    // 6. Codemaster Level-to-Level Pathway Skip (Synced with 2 Bounces + Stone Landing)
    function playLevelPathwaySkipSound() {
        // Hop 1 (0.08s)
        playTone(340, "sine", 0.16, 0.08, 0.11, 620);
        playTone(587.33, "triangle", 0.09, 0.22, 0.07); // Sparkle note 1

        // Mid-step touch (0.55s)
        playTone(440, "triangle", 0.07, 0.55, 0.07, 520);

        // Hop 2 (0.68s)
        playTone(420, "sine", 0.18, 0.68, 0.11, 780);
        playTone(783.99, "triangle", 0.09, 0.85, 0.07); // Sparkle note 2

        // Stone Target Landing Shockwave Chord (1.22s)
        playTone(160, "sine", 0.22, 1.2, 0.14, 75);     // Soft thud
        playTone(523.25, "triangle", 0.28, 1.22, 0.08); // C5
        playTone(659.25, "triangle", 0.28, 1.26, 0.08); // E5
        playTone(1046.5, "square", 0.35, 1.3, 0.06);    // C6
    }

    // 7. World-to-World BIG LEAP Sound (Rocket Launch Sweep + Sky Sparkles + Island Impact)
    function playWorldBigLeapSound() {
        // Initial launch whoosh (0.12s -> 0.85s)
        playTone(190, "sine", 0.65, 0.12, 0.12, 880);
        playTone(240, "triangle", 0.55, 0.18, 0.07, 960);

        // Mid-air spinning star arpeggio (0.65s -> 1.45s)
        const skyNotes = [587.33, 783.99, 987.77, 1174.66, 1567.98];
        skyNotes.forEach(function (freq, i) {
            playTone(freq, "triangle", 0.12, 0.65 + i * 0.14, 0.07);
        });

        // Descent whistle (1.35s -> 1.70s)
        playTone(780, "sine", 0.32, 1.35, 0.08, 220);

        // Destination World Island Impact & Victory Chord (1.72s)
        playTone(130, "sine", 0.38, 1.7, 0.18, 52);     // Deep island impact boom
        playTone(523.25, "square", 0.4, 1.72, 0.065);   // C5
        playTone(659.25, "square", 0.4, 1.76, 0.065);   // E5
        playTone(783.99, "square", 0.4, 1.8, 0.065);    // G5
        playTone(1046.5, "triangle", 0.5, 1.85, 0.09);  // C6
    }

    // 8. World Master Badge Ceremony Fanfare
    function playBadgeFanfareSound() {
        const fanfare = [
            { f: 523.25, d: 0.12, t: 0.05 }, // C5
            { f: 523.25, d: 0.12, t: 0.19 }, // C5
            { f: 523.25, d: 0.12, t: 0.33 }, // C5
            { f: 659.25, d: 0.22, t: 0.47 }, // E5
            { f: 783.99, d: 0.22, t: 0.72 }, // G5
            { f: 1046.5, d: 0.48, t: 0.96 }  // C6
        ];
        fanfare.forEach(function (n) {
            playTone(n.f, "square", n.d, n.t, 0.065);
        });
    }

    // 9. Master Event Listener for All Clicks, Quizzes, Pathways & World Leaps
    document.addEventListener(
        "click",
        function (e) {
            // Re-ensure the sound toggle button stays in the top bar after bar refreshes
            setTimeout(injectSoundToggleButton, 100);

            if (!soundEnabled) return;

            const target = e.target;

            // Ignore clicks on the mute button itself
            if (target.closest(".sound-toggle-btn")) return;

            // A. Quiz Option Clicked (Right vs. Wrong)
            const quizOpt = target.closest(".quiz-option");
            if (quizOpt) {
                if (quizOpt.disabled) return;
                if (quizOpt.dataset.answer === "correct") {
                    playCorrectXPSound();
                } else {
                    playWrongAnswerSound();
                }
                return;
            }

            // B. Next Level / Claim World Achievement Button Clicked
            const nextBtn = target.closest("#nextLevelButton");
            if (nextBtn) {
                const titleEl = document.getElementById("lessonTitle");
                const txt = titleEl ? titleEl.textContent : "";
                const match = txt.match(/LEVEL\s+(\d+)/i);
                const lvlNum = match && match[1] ? Number(match[1]) : 1;

                if (lvlNum < 10) {
                    playLevelPathwaySkipSound();
                } else {
                    playBadgeFanfareSound();
                }
                return;
            }

            // C. Badge Ceremony Collect Button -> Triggers Big World Leap Sound
            const claimBtn = target.closest("#ceremonyClaimBtn");
            if (claimBtn) {
                const btnText = claimBtn.textContent || "";
                if (btnText.indexOf("CLOSE SHOWCASE") !== -1) {
                    playBackSound();
                } else if (btnText.indexOf("UNVEIL ULTIMATE") !== -1) {
                    playBadgeFanfareSound();
                } else {
                    playWorldBigLeapSound();
                }
                return;
            }

            // D. Pathway & World Leap Action Buttons
            if (target.closest("#jumpToNextWorldBtn")) {
                playWorldSelectSound();
                return;
            }
            if (target.closest("#skipPathwayBtn, #closeWorldLeapBtn")) {
                playClickSound();
                return;
            }

            // E. Language World Card Clicked
            if (target.closest(".language-card")) {
                playWorldSelectSound();
                return;
            }

            // F. Unlocked Badge Pill Clicked in Top Bar
            if (target.closest(".badge-bar-pill.unlocked")) {
                playBadgeFanfareSound();
                return;
            }

            // G. Back or Reset Buttons Clicked
            if (target.closest(".back-button, .reset-btn")) {
                playBackSound();
                return;
            }

            // H. Any Other Button Clicked (Start Game, Start Level, Complete Lesson)
            if (target.closest("button")) {
                playClickSound();
            }
        },
        true
    );
})();


/* =========================================================
   INTERACTIVE NEXT-WORLD PROMPT & CHOSEN WORLD LEAP ENGINE
   ========================================================= */
(function initInteractiveWorldSelectorAndLeap() {
    const WORLD_ORDER = ["Python", "C", "CPP", "Java"];
    const WORLD_META = {
        Python: { title: "PYTHON WORLD", symbol: "🐍", short: "PYTHON" },
        C:      { title: "C WORLD",      symbol: "💻", short: "C" },
        CPP:    { title: "C++ WORLD",    symbol: "⚔️", short: "C++" },
        Java:   { title: "JAVA WORLD",   symbol: "☕", short: "JAVA" }
    };

    let trackedLang = "Python";
    let trackedLevel = 1;

    // Remove any previous pathway overlay so we can replace it cleanly
    const oldOverlay = document.getElementById("pathwayTransitionOverlay");
    if (oldOverlay) {
        oldOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "pathwayTransitionOverlay";
    overlay.className = "pathway-transition-overlay";
    document.body.appendChild(overlay);

    // Built-in Web Audio helper for the custom world leap sound
    function playBigLeapAudio() {
        if (localStorage.getItem("codequestSoundMuted") === "true") return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        try {
            const audio = new AudioCtx();
            const tone = function (freq, type, dur, delay, vol, slideTo) {
                const start = audio.currentTime + (delay || 0);
                const stop = start + dur;
                const osc = audio.createOscillator();
                const gain = audio.createGain();
                osc.type = type || "triangle";
                osc.frequency.setValueAtTime(freq, start);
                if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, stop);
                gain.gain.setValueAtTime(0.001, start);
                gain.gain.linearRampToValueAtTime(vol || 0.08, start + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.0008, stop);
                osc.connect(gain);
                gain.connect(audio.destination);
                osc.start(start);
                osc.stop(stop + 0.01);
            };

            // Rocket launch sweep + sky sparkles + island landing chord
            tone(190, "sine", 0.65, 0.1, 0.11, 880);
            [587.33, 783.99, 987.77, 1174.66, 1567.98].forEach(function (f, i) {
                tone(f, "triangle", 0.12, 0.6 + i * 0.14, 0.07);
            });
            tone(780, "sine", 0.3, 1.32, 0.08, 220);
            tone(130, "sine", 0.38, 1.68, 0.16, 52);
            tone(523.25, "square", 0.38, 1.7, 0.06);
            tone(659.25, "square", 0.38, 1.74, 0.06);
            tone(783.99, "square", 0.38, 1.78, 0.06);
            tone(1046.5, "triangle", 0.48, 1.82, 0.09);
        } catch (err) {}
    }

    // Check if a language world is already completed
    function isWorldCompleted(lang) {
        if (localStorage.getItem("codequestBadge_" + lang) === "true") return true;
        if (localStorage.getItem("codequest" + lang + "Level10Completed") === "true") return true;
        for (let i = 1; i <= 10; i++) {
            if (localStorage.getItem("codequest" + lang + "Level" + i + "Completed") !== "true") {
                return false;
            }
        }
        return true;
    }

    // Track active language and level from user clicks & #lessonTitle
    document.querySelectorAll(".language-card").forEach(function (card) {
        card.addEventListener("click", function () {
            if (card.dataset.language) trackedLang = card.dataset.language;
        });
    });

    document.querySelectorAll(".level-button[data-language]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (btn.dataset.language) trackedLang = btn.dataset.language;
            if (btn.dataset.level) trackedLevel = Number(btn.dataset.level);
        });
    });

    function syncStateFromLessonTitle() {
        const titleEl = document.getElementById("lessonTitle");
        if (!titleEl) return;
        const txt = titleEl.textContent || "";

        if (txt.indexOf("PYTHON") !== -1) trackedLang = "Python";
        else if (txt.indexOf("C++") !== -1) trackedLang = "CPP";
        else if (txt.indexOf("JAVA") !== -1) trackedLang = "Java";
        else if (txt.indexOf("C LEVEL") !== -1) trackedLang = "C";

        const match = txt.match(/LEVEL\s+(\d+)/i);
        if (match && match[1]) {
            trackedLevel = Number(match[1]);
        }
    }

    // Spawn sparkle trail behind the Codemaster during skips & leaps
    function spawnSparkleTrail(container, startLeftPct, endLeftPct, durationMs, isHighArc) {
        const steps = 11;
        const symbols = ["✨", "⭐", "⚡", "🌿"];
        for (let i = 1; i <= steps; i++) {
            setTimeout(function () {
                if (!overlay.classList.contains("active")) return;
                const progress = i / steps;
                const leftPct = startLeftPct + (endLeftPct - startLeftPct) * progress;
                const arcHeight = isHighArc
                    ? Math.sin(progress * Math.PI) * 135
                    : Math.abs(Math.sin(progress * Math.PI * 2)) * 28;

                const sp = document.createElement("span");
                sp.className = "codemaster-sparkle";
                sp.textContent = symbols[i % symbols.length];
                sp.style.left = leftPct + "%";
                sp.style.top = "calc(52% - " + arcHeight + "px)";
                container.appendChild(sp);

                setTimeout(function () {
                    sp.remove();
                }, 700);
            }, (durationMs / steps) * i);
        }
    }

    // Transition the main screen directly into the chosen language world
    function enterChosenWorldScreen(targetLang) {
        overlay.classList.remove("active");
        const badgeOverlay = document.getElementById("badgeCeremonyOverlay");
        if (badgeOverlay) badgeOverlay.classList.remove("active");

        const targetCard = document.querySelector('.language-card[data-language="' + targetLang + '"]');
        if (targetCard) {
            targetCard.click();
        }

        const screenMap = {
            Python: document.getElementById("pythonScreen"),
            C: document.getElementById("cScreen"),
            CPP: document.getElementById("cppScreen"),
            Java: document.getElementById("javaScreen")
        };
        const activeScreen = screenMap[targetLang];
        if (activeScreen) {
            activeScreen.classList.remove("world-arrival-transition");
            void activeScreen.offsetWidth;
            activeScreen.classList.add("world-arrival-transition");
        }
    }

    // =========================================================
    // 1. LEVEL-TO-LEVEL SKIPPING PATHWAY (LEVELS 1 -> 9)
    // =========================================================
    function playLevelSkipTransition(lang, fromLvl, toLvl) {
        const meta = WORLD_META[lang] || WORLD_META.Python;

        let stonesHTML = "";
        for (let i = 1; i <= 10; i++) {
            const doneClass = i <= fromLvl ? "stone-completed" : "";
            stonesHTML +=
                '<div class="path-stone ' + doneClass + '" data-stone="' + i + '">' +
                    '<span>' + i + '</span>' +
                '</div>';
        }

        const startPct = ((fromLvl - 0.5) / 10) * 100;
        const endPct = ((toLvl - 0.5) / 10) * 100;

        overlay.innerHTML =
            '<h2 class="pathway-title">' + meta.symbol + ' ' + meta.title + ' PATHWAY</h2>' +
            '<p class="pathway-subtitle" id="pathwayStatusText">🧙‍♂️ Codemaster is skipping from Level ' + fromLvl + ' to Level ' + toLvl + '...</p>' +
            '<div class="level-pathway-map" id="levelPathwayMap">' +
                stonesHTML +
                '<div class="codemaster-traveler" id="codemasterAvatar" style="left: ' + startPct + '%;">' +
                    '<span class="codemaster-sprite">🧙‍♂️' + meta.symbol + '</span>' +
                    '<span class="codemaster-tag">CODEMASTER</span>' +
                '</div>' +
            '</div>' +
            '<div class="pathway-actions">' +
                '<button type="button" class="pathway-action-btn" id="skipPathwayBtn">▶ CONTINUE TO LEVEL ' + toLvl + '</button>' +
            '</div>';

        overlay.classList.add("active");

        const mapEl = document.getElementById("levelPathwayMap");
        const avatarEl = document.getElementById("codemasterAvatar");
        const targetStone = mapEl.querySelector('.path-stone[data-stone="' + toLvl + '"]');
        const statusText = document.getElementById("pathwayStatusText");

        setTimeout(function () {
            if (!avatarEl) return;
            avatarEl.classList.add("skipping");
            avatarEl.style.left = endPct + "%";
            spawnSparkleTrail(mapEl, startPct, endPct, 1100, false);
        }, 80);

        setTimeout(function () {
            if (targetStone) {
                targetStone.classList.add("stone-target-glow");
                const wave = document.createElement("div");
                wave.className = "leap-shockwave";
                targetStone.appendChild(wave);
            }
            if (statusText) {
                statusText.textContent = "✨ Arrived at Level " + toLvl + "! Get ready, Codemaster!";
            }
        }, 1220);

        const closeTimer = setTimeout(function () {
            overlay.classList.remove("active");
        }, 2250);

        const skipBtn = document.getElementById("skipPathwayBtn");
        if (skipBtn) {
            skipBtn.addEventListener("click", function () {
                clearTimeout(closeTimer);
                overlay.classList.remove("active");
            });
        }
    }

    // =========================================================
    // 2. ASK USER: "DO YOU WANT TO PROCEED TO THE NEXT WORLD?" + WORLD OPTIONS
    // =========================================================
    function askProceedToNextWorld(fromLang) {
        const fromMeta = WORLD_META[fromLang] || WORLD_META.Python;

        let cardsHTML = "";
        WORLD_ORDER.forEach(function (langKey) {
            const m = WORLD_META[langKey];
            const completed = isWorldCompleted(langKey);
            const isCurrent = langKey === fromLang;

            cardsHTML +=
                '<button type="button" class="world-choice-card ' + (isCurrent ? "current-world-origin" : "") + '" data-target-world="' + langKey + '">' +
                    '<span class="world-choice-icon">' + m.symbol + '</span>' +
                    '<span class="world-choice-name">' + m.title + '</span>' +
                    '<span class="world-choice-status ' + (completed ? "done" : "") + '">' +
                        (completed ? "✅ COMPLETED" : "🔥 NEW QUEST") +
                    '</span>' +
                    '<span class="world-choice-cta">' +
                        (isCurrent ? "🔄 REVISIT WORLD" : "🚀 LEAP HERE ▶") +
                    '</span>' +
                '</button>';
        });

        overlay.innerHTML =
            '<div class="world-prompt-box">' +
                '<h2 class="pathway-title">' + fromMeta.symbol + ' ' + fromMeta.title + ' COMPLETED!</h2>' +
                '<p class="world-prompt-question">🌍 Do you want to proceed to the next world?</p>' +
                '<p class="world-prompt-sub">Choose which Coding World you want the Codemaster to leap to next:</p>' +
                '<div class="world-choice-grid">' +
                    cardsHTML +
                '</div>' +
                '<div class="pathway-actions">' +
                    '<button type="button" class="pathway-action-btn secondary" id="stayOnTrophyBtn">' +
                        '🏆 NO, STAY ON TROPHY & WORLD MAP' +
                    '</button>' +
                '</div>' +
            '</div>';

        overlay.classList.add("active");

        // When the user selects any World card, launch the Big Leap Transition to that specific world!
        overlay.querySelectorAll(".world-choice-card").forEach(function (card) {
            card.addEventListener("click", function () {
                const chosenLang = card.getAttribute("data-target-world");
                playWorldBigLeapTransition(fromLang, chosenLang);
            });
        });

        const stayBtn = document.getElementById("stayOnTrophyBtn");
        if (stayBtn) {
            stayBtn.addEventListener("click", function () {
                overlay.classList.remove("active");
            });
        }
    }

    // =========================================================
    // 3. ANIMATED BIG LEAP FROM COMPLETED WORLD TO CHOSEN WORLD
    // =========================================================
    function playWorldBigLeapTransition(fromLang, toLang) {
        const fromMeta = WORLD_META[fromLang] || WORLD_META.Python;
        const toMeta = WORLD_META[toLang] || WORLD_META.C;

        const fromIdx = Math.max(0, WORLD_ORDER.indexOf(fromLang));
        const toIdx = Math.max(0, WORLD_ORDER.indexOf(toLang));

        const startPct = ((fromIdx + 0.5) / 4) * 100;
        const endPct = ((toIdx + 0.5) / 4) * 100;

        let islandsHTML = "";
        WORLD_ORDER.forEach(function (langKey) {
            const m = WORLD_META[langKey];
            const isOrigin = langKey === fromLang ? "island-origin" : "";
            islandsHTML +=
                '<div class="world-island-node ' + isOrigin + '" data-world-node="' + langKey + '">' +
                    '<div class="island-symbol-orb">' + m.symbol + '</div>' +
                    '<span class="island-title-label">' + m.short + ' WORLD</span>' +
                '</div>';
        });

        overlay.innerHTML =
            '<h2 class="pathway-title">🚀 BIG LEAP TO ' + toMeta.symbol + ' ' + toMeta.title + '!</h2>' +
            '<p class="pathway-subtitle" id="worldLeapStatus">' +
                '🧙‍♂️ Codemaster is leaping from ' + fromMeta.symbol + ' ' + fromMeta.title + ' to ' + toMeta.symbol + ' ' + toMeta.title + '!' +
            '</p>' +
            '<div class="world-leap-map" id="worldLeapMap">' +
                islandsHTML +
                '<div class="codemaster-traveler" id="codemasterWorldLeaper" style="left: ' + startPct + '%; top: 62%;">' +
                    '<span class="codemaster-sprite">🧙‍♂️🚀</span>' +
                    '<span class="codemaster-tag">' + fromMeta.symbol + ' ➔ ' + toMeta.symbol + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="pathway-actions">' +
                '<button type="button" class="pathway-action-btn" id="enterChosenWorldNowBtn">' +
                    '⚡ ENTER ' + toMeta.symbol + ' ' + toMeta.title + ' NOW ▶' +
                '</button>' +
                '<button type="button" class="pathway-action-btn secondary" id="backToWorldChoicesBtn">' +
                    '◀ CHOOSE ANOTHER WORLD' +
                '</button>' +
            '</div>';

        overlay.classList.add("active");
        playBigLeapAudio();

        const mapEl = document.getElementById("worldLeapMap");
        const leaperEl = document.getElementById("codemasterWorldLeaper");
        const destIsland = mapEl.querySelector('.world-island-node[data-world-node="' + toLang + '"]');
        const statusEl = document.getElementById("worldLeapStatus");

        // Launch high-altitude parabolic leap from origin world to the user's chosen world
        setTimeout(function () {
            if (!leaperEl) return;
            leaperEl.classList.add("big-leaping");
            leaperEl.style.left = endPct + "%";
            spawnSparkleTrail(mapEl, startPct, endPct, 1600, true);
        }, 100);

        // Impact shockwave on destination world symbol orb
        setTimeout(function () {
            if (destIsland) {
                destIsland.classList.add("island-destination-impact");
                const wave = document.createElement("div");
                wave.className = "leap-shockwave";
                destIsland.appendChild(wave);
            }
            if (leaperEl) {
                const sprite = leaperEl.querySelector(".codemaster-sprite");
                if (sprite) sprite.textContent = "🧙‍♂️" + toMeta.symbol;
            }
            if (statusEl) {
                statusEl.textContent =
                    "⚡ LANDED IN " + toMeta.symbol + " " + toMeta.title + "! Entering world...";
            }
        }, 1720);

        // Automatically transition into the chosen world shortly after landing
        const autoEnterTimer = setTimeout(function () {
            enterChosenWorldScreen(toLang);
        }, 2850);

        const enterNowBtn = document.getElementById("enterChosenWorldNowBtn");
        if (enterNowBtn) {
            enterNowBtn.addEventListener("click", function () {
                clearTimeout(autoEnterTimer);
                enterChosenWorldScreen(toLang);
            });
        }

        const changeBtn = document.getElementById("backToWorldChoicesBtn");
        if (changeBtn) {
            changeBtn.addEventListener("click", function () {
                clearTimeout(autoEnterTimer);
                askProceedToNextWorld(fromLang);
            });
        }
    }

    // =========================================================
    // 4. INTERCEPT LEVEL COMPLETION & WORLD BADGE CEREMONY
    // =========================================================
    document.addEventListener(
        "click",
        function (e) {
            const nextBtn = e.target.closest("#nextLevelButton");
            if (nextBtn) {
                syncStateFromLessonTitle();
                if (trackedLevel < 10) {
                    playLevelSkipTransition(trackedLang, trackedLevel, trackedLevel + 1);
                } else {
                    if (!document.getElementById("badgeCeremonyOverlay")) {
                        askProceedToNextWorld(trackedLang);
                    }
                }
            }

            // Right after the player collects their World Badge in the ceremony, ask if they want to proceed & which world!
            const claimBtn = e.target.closest("#ceremonyClaimBtn");
            if (claimBtn) {
                const btnText = claimBtn.textContent || "";
                // Do not prompt if they only clicked a badge in the top bar showcase
                if (btnText.indexOf("CLOSE SHOWCASE") !== -1) return;

                setTimeout(function () {
                    const badgeOverlay = document.getElementById("badgeCeremonyOverlay");
                    const ceremonyFinished = !badgeOverlay || !badgeOverlay.classList.contains("active");
                    if (ceremonyFinished) {
                        askProceedToNextWorld(trackedLang);
                    }
                }, 420);
            }
        },
        true
    );
})();