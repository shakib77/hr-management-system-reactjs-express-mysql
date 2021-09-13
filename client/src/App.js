import './App.css';
import {useState} from "react";
import Axios from 'axios'

function App() {

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState('');
    const [position, setPosition] = useState('');
    const [wage, setWage] = useState(0);

    const [employeeList, setEmployeeList] = useState([]);

    const addEmployee = () => {
        Axios.post('http://localhost:3001/create',
            {
                name: name,
                age: age,
                country: country,
                position: position,
                wage: wage
            }).then(() => {
            setEmployeeList([...employeeList, {
                name: name,
                age: age,
                country: country,
                position: position,
                wage: wage
            }])
        })
    };

    const getEmployees = () => {
        Axios.get('http://localhost:3001/employees').then((res) => {
            setEmployeeList(res.data)
        })
    }

    return (
        <div className="App">
            <div className='main'>
                <div className='input-info'>
                    <label htmlFor="">Name:</label>
                    <input type="text"
                           onChange={(event => setName(event.target.value))}
                    />
                    <label htmlFor="">Age:</label>
                    <input type="number"
                           onChange={(event => setAge(event.target.value))}
                    />
                    <label htmlFor="">Country:</label>
                    <input type="text"
                           onChange={(event => setCountry(event.target.value))}
                    />
                    <label htmlFor="">Position:</label>
                    <input type="text"
                           onChange={(event => setPosition(event.target.value))}
                    />
                    <label htmlFor="">Wage (monthly):</label>
                    <input type="number"
                           onChange={(event => setWage(event.target.value))}
                    />

                    <button onClick={addEmployee}>Add Employee</button>
                </div>
            </div>
            <hr/>
            <div className='employees-info'>
                <button onClick={getEmployees}>Show Employees</button>

                {employeeList.map((value, key) => {
                    return <div>
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Country</th>
                                <th>Position</th>
                                <th>Wage</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{value.name}</td>
                                <td>{value.age}</td>
                                <td>{value.country}</td>
                                <td>{value.position}</td>
                                <td>{value.wage}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                })}
            </div>
        </div>
    );
}

export default App;
