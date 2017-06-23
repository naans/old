import React   from 'react'
import {Alert} from '../bootstrap'
import alerts  from '../meta/alerts'
import {errors, infos} from '../../helpers/notifiers'

const Errors = alerts(errors, 'danger')
const Infos  = alerts(infos, 'info')

export default props =>
    <div>
        <Errors />
        <Infos />
    </div>

