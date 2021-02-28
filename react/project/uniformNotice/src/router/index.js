
import IndexPage from '@/pages/index';
import TemplatePage from '@/pages/template';
import MarketingPage from '@/pages/marketing';
import StatisticsPage from '@/pages/statistics';

const routes = [
    {
        path: '/',
        
    },
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