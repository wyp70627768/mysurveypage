<template>
    <form v-bind:class="{submitted: submitted === true}">
        <div v-for="(question, qIndex) in survey.questions">
            <div class="formfield">
                <span class="index">{{qIndex + 1 + "."}}</span>
                <label v-bind:class="{invalid: userResponses[qIndex] === ''}">{{question.title}}</label>
                <div v-if="question.type !== 'text'" v-for="(answer, aIndex) in question.answers">
                    <input :type="question.type" :name="qIndex" :value="answer" @click="updateSelection(qIndex, aIndex, question.type)">
                    <span>{{answer}}</span>
                </div>                
                <div v-if="question.type === 'text'" class="text-question">
                    <textarea class="textarea" v-model="userResponses[qIndex]" @keyup="updateAreaData(qIndex, $event)"></textarea>
                </div>
                <br>
            </div>
        </div>
        <div class="controls">
            <button class="button" v-on:click="submit($event)">Done</button>
        </div>
    </form>
</template>

<style scoped>

form {
    margin: 10% 20%;
}

.formfield {
    margin-bottom: 1.5em;
}

.formfield span.index {
    color: #1DBD72;
}

.submitted .invalid {
    color: red;
}

.formfield label {
    color: #1DBD72;
}

.controls {
    text-align: center;
}

.button {
    background-color: #1DBD72;
    color: white;
    border: #1DBD72;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 3px;
}

textarea {
    boder: 1px solid gray;
    height: 10rem;
    font-size: 14px;
    width: 90%;
    display: table-cell;
    margin: 10px 0;
    cursor: pointer;
}

</style>

<script>
    export default {
        data: function() {
            return{
                survey: [],
                userResponses: [],
                errorMessage: '',
                submitted: false,
                submitData: {}
            }
        },

        created: function() {
            this.getQuestions();
        },

        methods: {
            getQuestions() {
                let uri = '/api/surveys/' + this.$route.params.id;
                this.axios.get(uri).then((response) => {
                    this.survey = response.data;
                    this.userResponses.length = this.survey.questions.length;
                    this.userResponses.fill('');

                    // create submit data object
                    this.createSubmitData();
                }).catch(e => {
                    console.log(e);
                });
            },
            submit(event) {
                this.submitted = true;

                if (event) event.preventDefault();

                if (this.userResponses.indexOf('') === -1) { 
                    // this.createSubmitData();
                    this.postSurvey();
                }
            },
            createSubmitData() {
                this.submitData["surveyId"] = this.survey._id;
                this.submitData["questions"] = this.createQuestions(this.survey);
            },
            createQuestions(survey) {
                var questions = []; 
                var len = survey.questions.length;

                for (var i=0; i < survey.questions.length; i++) {
                    questions.push({
                        "text": survey.questions[i]["title"],
                        "answers": this.createAnswer(survey.questions[i],i)
                    })
                }
                return questions;
            },
            createAnswer(question, questionPosition) {
                var answers = [];
                var length = question.answers.length;

                for (var i=0; i < length; i++) {
                    answers.push({
                        "text": question.answers[i],
                        "isSelected": false
                    })
                }
                return answers;
            },
            postSurvey() {
                this.axios.post('/api/submissions', this.submitData)
                .then(response => {
                    this.$router.push("/");
                })
                .catch(e => {
                    console.log(e);
                })
            },
            updateSelection (qIndex, aIndex, type) {
                var answers = this.submitData.questions[qIndex].answers,
                    len = answers.length,
                    i = 0,
                    selected = answers[aIndex].isSelected,
                    questionAnswered = false;
                if (type === 'radio') {
                    for (i = 0; i < len; i++) {
                        if (i === (aIndex)){
                            answers[i].isSelected = true;
                        } else {
                            answers[i].isSelected = false;
                        }
                    }
                } else if (type === 'checkbox') {
                    answers[aIndex] = !selected;
                }
                

                // update userResponses data
                for (i = 0; i < len; i++) {
                    if (answers[i].isSelected === true){
                        questionAnswered = true;
                        break;
                    } 
                }

                if (questionAnswered) {
                    this.userResponses[qIndex] = true;
                } else {
                    this.userResponses[qIndex] = '';
                }
            },
            updateAreaData (qIndex, event) {
                var answers = this.submitData.questions[qIndex].answers;
                answers[0].text = event.target.value;
                if(answers[0].text !== '') {
                    answers[0].isSelected = true;
                    this.userResponses[qIndex] = true;
                } else {    
                    answers[0].isSelected = false;
                    this.userResponses[qIndex] = '';
                }
            }
        }
    }
</script>