import React from 'react'

let imageURL = 'https://image.tmdb.org/t/p/w500'

class Actors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let actors = this.props.actors ? this.props.actors : []
        console.log(actors)
        return (
            <div className="actors">
                {actors.map((actor, idx) => {
                    return (
                        <div key={idx} className="actor-container">
                            <div className="actor-img">
                                <img
                                    src={actor.entity.url}
                                    height="500"
                                    width="500"
                                />
                            </div>
                            <div>{actor.entity.name}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Actors
