import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home/home.vue'
import ViewPage from '@/components/viewPage/viewPage.vue'
import CreateSurvey from '@/components/createSurvey/createsurvey.vue'
import SubmissionViewPage from '@/components/submissions/viewPage.vue' 
import SummaryPage from '@/components/summaryPage/summary.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/surveys',
      component: Home,
      },
    {
      path: '/surveys/:id',
      component: ViewPage,
      props: { default: true, sidebar: false }
      },
      {
      path: '/createsurvey',
      name: 'CreatePage',
      component: CreateSurvey
      },
      {
      path: '/submissions/:id',
      name: 'Submission',
      component: SubmissionViewPage
      },
      {
        path: '/summary',
        name: 'SummaryPage',
        component: SummaryPage
      }
  ]
})
