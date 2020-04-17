
import computed from '@/mixins/computed'

Component({
    behaviors: [computed],
    data: {
        a: 1
    },
    computed: {
        result () {
            return this.data.a + 1
        }
    }
})