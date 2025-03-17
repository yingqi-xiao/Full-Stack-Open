const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  const Header = (props) => {
    //rendering the name of the course
    console.log(props)
    return <h2>{props.course}</h2>
  }
  
  const Content = (props) => {
    //rendering the parts and their number of exercises
    console.log(props)
    return (
      <div>
        {props.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Part = (props) => (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
  
  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p><strong>total of {total} exercises</strong></p>
  }

export default Course