import { Scenes } from 'telegraf'
import Context from '../types/types'

import home from './home'

let controller = new Scenes.Stage<Context>(
    [ home ],
    { default: 'home' }
)

export default controller