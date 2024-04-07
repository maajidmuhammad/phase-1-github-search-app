async function searchUsers(username) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous search results
  
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error:', data.message);
        return;
      }
  
      if (data.items.length === 0) {
        userList.innerHTML = '<li>No users found</li>';
        return;
      }
  
      data.items.forEach(user => {
        const listItem = document.createElement('li');
        const userLink = document.createElement('a');
        userLink.href = user.html_url;
        userLink.target = '_blank';
        userLink.textContent = user.login;
  
        listItem.appendChild(userLink);
        userList.appendChild(listItem);
  
        userLink.addEventListener('click', function (e) {
          e.preventDefault();
          showUserRepos(user.login);
        });
      });
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }
  
  async function showUserRepos(username) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous repos
  
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const repos = await response.json();
  
      if (!response.ok) {
        console.error('Error:', repos.message);
        return;
      }
  
      if (repos.length === 0) {
        reposList.innerHTML = '<li>No repositories found for this user</li>';
        return;
      }
  
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
        repoLink.textContent = repo.name;
  
        listItem.appendChild(repoLink);
        reposList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching user repos:', error);
    }
  }
  