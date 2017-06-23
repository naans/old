import React    from 'react'
import {Alert}  from '../bootstrap'

export default (notifier, type) => class extends React.Component {
    constructor() {
        super()
        this.state = {items: []}
        notifier.subscribe(this.update.bind(this))
    }
    update() {
        this.setState({items: notifier.all()})
    }
    render() {
        return (
        <div>
            {this.state.items.map((item, index) =>
                <Alert key={index} type={type} onClose={() => notifier.remove(index)}>{item}</Alert>
            )}
        </div>
        )
    }
}
