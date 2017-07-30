import React  from 'react'
import {Navbar} from '../bootstrap'

export default props =>
    <Navbar title="Naans" type="default" links={
        [
            ['/admin/pictures/all', 'Photos'],
            ['/admin/categories/all', 'Categories'],
            ['/admin/meals/all', 'Repas']
        ]
    } />
