const GithubProfileCardComponent = {
    template: '#github-user-card-template',
    props: {
        username: String
    },
    data() {
        return {
            avatar_url: null,
            html_url: null,
            name: null,
            bio: null,
            created_at: null,
            followers: null
        }
    },
    computed: {
        created_year() {
            return this.created_at.getFullYear();
        }
    },
    created() {
        const url = 'https://api.github.com/users/' + this.username;
        axios.get(url)
            .then((response) => {
                console.log(response)
                const data = response.data;
                this.avatar_url = data.avatar_url;
                this.html_url = data.html_url;
                this.name = data.name;
                this.bio = data.bio;
                this.created_at = new Date(data.created_at);
                this.followers = data.followers;
            })
            .catch((error) => console.error)
    }
}

new Vue({
    el: '#app',
    components: {
        'github-user-card': GithubProfileCardComponent
    }
})