<template>
  <div class="content">
    <div class="question-content">
      <header class="header">
        <input type="text" class="title" placeholder="Fill Survey Title" v:bind="title" v-model="title">
        <input type="button" class="add-question-button-text" @click="showModal = true" :value="label.addNewQuestion">
      </header>
      <div v-if="showModal === true" class="question-type">
        <div class="toolbar">
          <span class="btn" v-for="item in availModues" @click="addQuestion(item.value)">{{item.text}}</span>
        </div>        
      </div>
      <div class="question-body">
        <ol v-if="questions.length !== 0" class="questions">
            <li
              v-for="(question, qIndex) in questions"
              track-by="$index"
              :q-index="qIndex"
              :class="question.type"
              class="question-item-group">
              <div class="side">
                <div class="order">Q{{ qIndex + 1 }}:</div>
              </div>
              <div class="content">
                <!-- questions title-->
                <input type="text" @keyup="changeQuestionTitle(qIndex, $event)"
                  class="input title" contenteditable :value="question.title">
                <!-- questions title end -->
                <!-- answers cells -->
                <ol v-if="question.type !== 'text'" class="answers">
                  <!-- answer -->
                  <li
                    v-for="(answer, aIndex) in question.answers"
                    class="answer">
                    <!-- checkboxs -->
                    <input class="select"
                      :type="question.type" 
                      :name="qIndex"/>
                    <!-- option text -->
                    <div class="option">
                      <div class="input-fix">
                        <input type="text"
                          @keyup="changeOptionValue(qIndex, aIndex, $event)"
                          @change="changeOptionValue(qIndex, aIndex, $event)"
                          class="input"
                          contenteditable :value="questions[qIndex].answers[aIndex]">
                      </div>
                      <div class="adjust-button">
                        <span class="span-btn add-answer" @click="addOption(qIndex)">+</span>
                        <span v-show="question.answers.length >= 2" class="span-btn delete-answer" @click="deleteOption(qIndex, aIndex)">-</span>
                      </div>                      
                    </div>
                  </li>
                </ol>
                <!-- all end -->
                <div v-else class="option">
                  <textarea class="textarea"></textarea>
                  <!-- <label for="isRequired"><input
                    @change="changeTextRequired(qIndex, $event)"
                    :checked="question.required"
                    class="required"
                    id="isRequired"
                    type="checkbox">is required</label> -->
                </div>
              </div>
              
            </li>
          </ol>
          <div v-if="questions.length !== 0" class="question-save">
            <div class="toolbar">
              <input class="btn save-questions" type="button" value="Save Questions" @click="saveSurvey()"></input>
            </div>
          </div>
      </div>      
    </div>
  </div>

</template>

<script>
export default {
  data () {
    var defaultData = {
      label: {
        edit: 'Edit',
        addNewQuestion: 'NEW QUESTION',
        question:'Question'
      },
      title: 'Survey Title',
      questions: [],
      showModal: false,
      availModues: [
        {
          text: 'single selection',
          value: 'radio'
        },{
          text: 'multiple answer',
          value: 'checkbox'
        },{
          text: 'rich text',
          value: 'text'
        }]
    };
    return defaultData;
  },
  methods: {
    addOption (qIndex) {
      this.questions[qIndex].answers.push('Option ' + (this.questions[qIndex].answers.length + 1));
      this.questions[qIndex].answersData.push(this.getRandomNumber());
    },
    addQuestion (type) {
      var option = {
        title: 'Question Title',
        type: type        
      }
      if (type !== 'text') {
        option.answers = ['Option 1', 'Option 2']
        option.answersData = [this.getRandomNumber(), this.getRandomNumber()]
      } else {
        option.text = ''
      }
      this.showModal = false;
      this.questions.push(option)
    },   
    changeOptionValue (qIndex, aIndex, event) {
      this.questions[qIndex].answers[aIndex] = event.target.value;
    },
    changeQuestionTitle (qIndex, event) {
      this.questions[qIndex].title = event.target.value;
    },
    deleteOption(qIndex, oIndex) {
      this.questions[qIndex].answers.splice(oIndex, 1);
      this.questions[qIndex].answersData.pop();
    },
    getRandomNumber () {
      return Math.floor(Math.random() * 30)
    },
    saveSurvey () {
      this.axios.post('/api/surveys', this.getSurveyData)
        .then(response => {
          this.$router.push("/");
        })
        .catch(e => {
            console.log(e);
        })
    }
  },
  computed: {
    getSurveyData() {
      return {
        title: this.title,
        questions: this.questions
        //TODO, need survey id?
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/editpage'
</style>
