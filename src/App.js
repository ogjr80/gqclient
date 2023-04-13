// src/App.js
import { gql, useMutation } from '@apollo/client';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($firstName: String!, $lastName: String!, $email: String!, $age: Int!) {
    addEmployee(firstName: $firstName, lastName: $lastName, email: $email, age: $age) {
      id
      firstName
      lastName
      email
      age
    }
  }
`;

function App() {
  const [addEmployee] = useMutation(ADD_EMPLOYEE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const age = parseInt(event.target.age.value, 10);

    try {
      const { data } = await addEmployee({ variables: { firstName, lastName, email, age } });
      alert(`Employee added: ${data.addEmployee.firstName} ${data.addEmployee.lastName}`);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" required />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" required />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default App;
