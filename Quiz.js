function fetchCategory() {


    fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => ShowCategories(data.trivia_categories));

    ShowCategories = data => {
        let categorySel = document.getElementById("Select_Category");


        console.log(data);

        data.forEach(category => {
            const Element = document.createElement("option");

            Element.setAttribute('value', category.id);
            Element.innerText = category.name;

            categorySel.append(Element);

        });

    }
}
fetchCategory();

function getDifficultyLevel() {
    var selCategory = document.getElementById('Select_Category').value;
    fetch(`https://opentdb.com/api_count.php?category=${selCategory}`)
        .then(response => response.json())
        .then(data => ShowDifficulties(data.category_question_count));


    ShowDifficulties = data => {
        var difficultySel = document.getElementById("Select_Difficulty");
        console.log(data);
        // console.log(data[total_easy_question_count]);



        const easyLevel = document.createElement("option");
        easyLevel.setAttribute('value', 'easy');
        easyLevel.innerText = "Easy:" + data.total_easy_question_count;
        difficultySel.append(easyLevel);

        const mediumLevel = document.createElement("option");
        mediumLevel.setAttribute('value', 'medium');
        mediumLevel.innerText = "Medium:" + data.total_medium_question_count;
        difficultySel.append(mediumLevel);

        const hardLevel = document.createElement("option");
        hardLevel.setAttribute('value', 'hard');
        hardLevel.innerText = "Hard:" + data.total_hard_question_count;
        difficultySel.append(hardLevel);
    }
}
// getDifficultyLevel();

function getQuestions() {
    var selCategory = document.getElementById('Select_Category').value;
    var difficultylevel = document.getElementById("Select_Difficulty").value;
    fetch(`https://opentdb.com/api.php?amount=10&category=${selCategory}&difficulty=${difficultylevel}`)
        .then(response => response.json())
        .then(data => ShowQuestions(data.results));

    ShowQuestions = data => {
        var questionSel = document.getElementById("Display_questions");

        console.log(data);

        data.forEach(display => {
            const questions = document.createElement("div");
            const breaktag = document.createElement("br");
            questions.innerText = "Question:" + ' ' + display.question;
            questions.setAttribute('id', 'parts')
            questionSel.append(questions);
            questions.append(breaktag);
            // console.log(questions);

            const correctAns = document.createElement("input");
            const correctLabel = document.createElement("label");
            // correctAns.innerText = "Options:" + display.correct_answer + '    ';
            correctAns.setAttribute('type', 'radio');
            correctAns.setAttribute('id', 'rbutton');
            correctAns.setAttribute('name', 'answer');

            correctLabel.setAttribute('id', 'Display_Answer');
            correctLabel.innerHTML = display.correct_answer + '    ';
            // questionSel.append(correctAns);
            // questionSel.append(correctLabel);
            questions.append(breaktag);
            questions.append(correctAns);
            questions.append(correctLabel);

            // console.log(correctAns);

            let key;
            for (key in display.incorrect_answers) {
                const incorrectAns = document.createElement("input");
                const incorrectLabel = document.createElement("label");
                const breaktag = document.createElement("br");
                incorrectAns.setAttribute('type', 'radio');
                incorrectAns.setAttribute('id', `rbutton${key}`);
                incorrectAns.setAttribute('name', 'answer');
                incorrectAns.setAttribute('value', `${display.incorrect_answers[key]}`);
                incorrectLabel.setAttribute('id', `Display_incAnswer${key}`);

                // incorrectAns.innerHTML = display.incorrect_answers;
                incorrectLabel.innerHTML = `${display.incorrect_answers[key]}`;
                // questionSel.append(breaktag);
                // questionSel.append(incorrectAns);
                // questionSel.append(incorrectLabel);
                questions.append(breaktag);
                questions.append(incorrectAns);
                questions.append(incorrectLabel);

                function submitButton() {
                    var button = document.getElementById('Display_button');
                    const submit = document.createElement('input');
                    submit.setAttribute('type', 'submit');
                    submit.setAttribute('id', 'submitbutton');
                    submit.innerHTML = "Submit";
                    button.append(submit);
                }

                // const submitAns = document.createElement("div");
                // submitAns.setAttribute('type', 'submit');
                // submitAns.setAttribute('id', 'submitButtom');

                // function submitButton() {
                //     let count = 0;
                //     if (correctAns === true) {
                //         count++;
                //     } else {
                //         count = 0;
                //     }
            }


        });

    }
}