import React, { Component } from "react";
import PropTypes from "prop-types";
import { GoEye, GoRepoForked, GoStar } from "react-icons/go";
class ProfileGitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: "686289321d1c9e6487c7",
      clientSecret: "0c529db8a83fda9a1ec4e72080cb49b547bb6263",
      count: 5,
      sort: "created: asc",
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;

    const { count, sort, clientID, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ repos: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const { user } = this.props;
    const firstName = user.name.trim().split(" ")[0];

    const repoItems = repos.map((repo) => (
      <div className="card card-body mb-2" key={repo.id}>
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              <GoStar />
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              <GoEye />
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              <GoRepoForked />
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest GitHub Repos by {firstName}</h3>
        {repoItems}
      </div>
    );
  }
}
ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default ProfileGitHub;
