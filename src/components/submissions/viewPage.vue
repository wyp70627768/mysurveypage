<template>
  <div>
    <div class="no-results" :class="{ active: hasSubmission}">There is no submission for this survey</div>
    <canvas id='bar-chart' width="400" height="100"></canvas>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        submission: [],
        labels: [],
        dataPacks: [],
        maxAnswerCount: 0,
        dataSets: [],
        hasSubmission: false
      }
    },
    created: function () {
        this.getSubmission();
    },
    methods: {
        getSubmission() {
            let uri = '/api/charts/' + this.$route.params.id;
            this.axios.get(uri).then((response) => {
                this.submission = response.data;
                if (this.submission.length > 0) {
                    this.createChart();
                } else {
                    this.hasSubmission = true
                }
            }).catch(e => {
                console.log(e);
            });
        },
        createChart() {
            this.setup();
            this.renderChart();
        },
        renderChart() {
                var bar_ctx = document.getElementById('bar-chart');
                var bar_chart = new Chart(bar_ctx, {
                    type: 'bar',
                    data: {
                        labels: this.labels,
                        datasets: this.dataSets
                    },
                    options: {
                        animation: {
                            duration: 1000,
                        },
                        tooltips: {
                            mode: 'label',
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel;
                                }
                            }
                         },
                        scales: {
                            xAxes: [{
                                stacked: true,
                                gridLines: { display: false },
                            }],
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    callback: function(value) { return value; },
                                },
                            }],
                        }, // scales
                        legend: {display: true}
                    } // options
                });
            },
            setup() {
                this.createDataPacks();
                this.createXAxisLabels(this.submission);

                this.createDataSets();
            },
            createDataPacks() {
                this.maxAnswerCount = this.getMaxAnswerCount();

                for (var i = 0; i < this.maxAnswerCount; i++) {
                    var dataPack = [];

                    dataPack.length = this.submission.length;
                    dataPack.fill(0);

                    this.dataPacks.push(dataPack);
                }

                this.fillDataPacks()
            },
            fillDataPacks() {
                var questionCount = this.submission.length;

                for (var i = 0; i < this.submission.length; i++) {
                    for (var j = 0; j < this.submission.length; j++) {
                        for (var k = 0; k < questionCount; k++) {
                            if (this.submission[j].answers.length <= i) {
                              this.dataPacks[i][j] = 0;
                            } else {
                              this.dataPacks[i][j] = this.submission[j].answers[i]['total']
                            }
                        }
                    }
                }
            },
            getMaxAnswerCount() {
                var questionCount = this.submission.length,
                    answers = [];

                for (var i = 0; i < questionCount; i++) {
                    answers.push(this.submission[i].answers.length);
                }

                return Math.max(Math.max.apply(Math,answers), questionCount);
            },
            createXAxisLabels() {
                var questionCount = this.submission.length;

                for (var i = 0; i < questionCount; i++) {
                    this.labels.push(this.submission[i]._id.questionText);
                }
            },
            createDataSets() {
                var length = this.dataPacks.length;

                for (var i = 0; i < length; i++) {
                    var randomBackgroundColor = this.getRandomColor(),
                        dataSet = {
                            label: 'A Label',
                            data: '',
                            backgroundColor: 'rgba(225, 58, 55, 0.7)',
                            hoverBackgroundColor: 'rgba(225, 58, 55, 0.7)',
                            hoverBorderWidth: 2,
                            hoverBorderColor: 'lightgrey'
                        };

                    dataSet.data = this.dataPacks[i];
                    dataSet.backgroundColor = randomBackgroundColor;
                    dataSet.hoverBackgroundColor = randomBackgroundColor;
                    this.dataSets.push(dataSet)
                }
            },
            getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';

                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }

                return color;
            }
        }
    }
</script>

<style scoped>
.no-results {
    display: none;
}

.no-results.active{
    display: block;
    margin: 5%;
}

canvas {
    margin: 50px;
}

</style>