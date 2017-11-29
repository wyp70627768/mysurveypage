<template>
    <div class="suvery-list-content">
        <table class="surveylist-table">
            <thead>
                <th v-for="column in columns" :class="column.field">{{column.label}}</th>
            </thead>
            <tbody>
                <tr v-for="survey in surveys">
                    <td v-for="column in columns" :class="column.field" class="survey-body-column">
                        <a v-if="column.field === 'name'" :href="'#/surveys/' + survey._id">{{survey.title}}</a>
                        <a v-if="column.field === 'result'" :href="'#/submissions/' + survey._id">Survey Result</a>                          
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="button" class="createSurvery-btn" name="Create Survey" value="Create Survey" @click="createSurvey()">
    </div>
</template>

<script>

    export default {
        data: function() {
            return{
                surveys: [],
                columns: [
                    {
                      label: 'Survey Name',
                      field: 'name'
                    },
                    {
                      label: 'View Suvey Result',
                      field: 'result'
                    }
                ]
            }
        },

        created: function() {
            this.getSurveys();
        },

        methods: {
            getSurveys() {
                let uri = '/api/surveys';
                this.axios.get(uri).then((response) => {
                    this.surveys = response.data;
                }).catch(e => {
                    console.log(e);
                });
            },
            createSurvey () {
              this.$router.push("/createsurvey");
            }
        }
    }
</script>

 <style scoped lang='scss'>
@import "../../scss/home"

</style>