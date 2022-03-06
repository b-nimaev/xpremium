import { Scenes } from 'telegraf'
import { context as Context } from '../types/types'
import admin from './admin'
import home from './home/home'

let controller = new Scenes.Stage<Context>(
    [ home, admin ],
    { default: 'home' }
)

export default controller