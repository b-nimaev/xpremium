import { Scenes } from 'telegraf'
import Context from './types'

import home from './controller/home'

let controller = new Scenes.Stage<Context>(
    [ home ],
    { default: 'home' }
)

export default controller