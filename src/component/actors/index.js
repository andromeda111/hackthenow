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
                                <img src={actor.entity.image.url} />
                            </div>
                            <div className="actor-details">
                                <div className="actor-name">
                                    {actor.entity.name} - Similarity:{' '}
                                    {Math.round(actor.matchConfidence * 100)}%
                                </div>
                                <p>{actor.entity.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Actors
