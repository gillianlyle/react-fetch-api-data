import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://reqres.in/api/users")
      .then(response => response.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <p>Error: {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading data, please wait...</p>;
    } else {
      return (
        <table>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.avatar} alt="avatar" width="75px" />
              </td>
              <td>
                Name: {item.first_name} {item.last_name} <br />
                Email: {item.email}
              </td>
            </tr>
          ))}
        </table>
      );
    }
  }
}
