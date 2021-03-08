
import IndexPage from '@/pages/index/index';
import TemplatePage from '@/pages/template/template';
import MarketingPage from '@/pages/marketing/marketing';
import StatisticsPage from '@/pages/statistics/statistics';

const routes = [
    {
        path: '/index',
        component: IndexPage
    },
    {
        path: '/template',
        component: TemplatePage
    },
    {
        path: '/marketing',
        component: MarketingPage
    },
    {
        path: '/statistics',
        component: StatisticsPage
    }
]

export default routes;