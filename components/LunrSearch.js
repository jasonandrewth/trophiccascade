import moonwalkers from '../moonwalkers'

class ReactSearchLunr extends React.Component {
  render() {
    return (
      <div>
        {moonwalkers.map(walker => (
          <div key={walker.id}>
            <h2>{walker.name}</h2>
            <p>{walker.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default ReactSearchLunr