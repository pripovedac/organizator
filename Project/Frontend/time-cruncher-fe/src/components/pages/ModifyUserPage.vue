<template>
    <div class="modify-user">
        <div class="content-container">
            <h1>User details</h1>
            <p>Looks like you want to chek out your details.
                Feeling that you should change something?
            </p>
            <form @submit.prevent="updateUser($event)">
                <PublicInput v-model="user.firstname"
                             label="Firstname"
                             type="text"/>
                <PublicInput v-model="user.lastname"
                             label="Lastname"
                             type="text"/>
                <PublicInput v-model="user.email"
                             label="Email"
                             type="text"/>
                <Button type="submit">Update info</Button>
                <Button @click="goBack($event)">
                    Cancel
                </Button>
            </form>
            <div class="danger-zone">
                <h2>
                    <Trash2Icon class="icon"/>
                    Danger zone
                </h2>
                <div class="delete-container">
                    <p>Delete your account</p>
                    <DeleteButton @click="deleteAccount($event)">
                        Delete
                    </DeleteButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PublicInput from '../ui/PublicInput'
    import Button from '../ui/Button'
    import router from '../../routes/routes'
    import {userState} from '../../services/utilites'
    import * as global from '../../services/utilites'
    import * as userApi from '../../services/api/user'
    import {responseHandler} from '../../services/response-handler'
    import DeleteButton from '../ui/DeleteButton'
    import {Trash2Icon} from 'vue-feather-icons'

    export default {
        name: 'ModifyUserPage',
        components: {
            DeleteButton,
            PublicInput,
            Button,
            Trash2Icon,
        },
        data() {
            return {
                user: {},
                userId: this.getUserId()
            }
        },
        methods: {
            bootstrap: async function () {
                await this.fetchUser()
            },

            fetchUser: async function () {
                const response = await userApi.getUser(this.userId)
                const errorMessage = 'Could not get your data.'
                responseHandler.handle(response, this.initUser, errorMessage)
            },

            initUser: function (response) {
                this.user = response
            },

            updateUser: async function () {
                let updatedUser = {
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    email: this.user.email
                }
                const response = await userApi.updateUser(this.userId, updatedUser)
                const errorMessage = 'Problem with update'
                responseHandler.handle(response, this.successfulUpdate, errorMessage)
                userState.updateUser(updatedUser)
            },

            successfulUpdate: function () {
                alert('Successfully updated infos!')
                this.goBack()
            },

            goBack: function () {
                router.push({name: 'WelcomePage'})
            },

            getUserId: function () {
                return global.userState.loadId()
            },

            deleteAccount: async function () {
                const response = await userApi.deleteUser(this.userId)
                const errorMessage = 'Problem with update.'
                responseHandler.handle(response, this.successfulDelete, errorMessage)
            },

            successfulDelete: function () {
                global.storageHandler.clear()
                router.push({name: '/login'})
            }
        },
        created() {
            this.bootstrap()
        }
    }
</script>

<style scoped lang="scss">
    @import '../styles/main.scss';

    .modify-user {
        display: block;
        height: 100vh;
        background-color: #fff;
        font-family: 'Montserrat', sans-serif;
    }

    .content-container {
        @extend %flexColumn;

        width: 50%;
        margin: 0 auto;
        padding: 1%;
    }

    h1 {
        margin-top: 0;
        margin-bottom: 0;
    }

    p {
        font-size: 0.8em;
        padding-bottom: 3%;
    }

    label {
        display: flex;
        margin-bottom: 5%;
        font-family: inherit;
    }

    .label-checkbox {
        @include centerRowData();
    }

    .checkbox {
        margin-right: 2%;
    }

    .public-input {
        margin-bottom: 1.5em;
    }

    .label-container {
        @extend %flexColumn;
        justify-content: center;
        align-self: center;
        font-size: 1em;

        span {
            margin-top: 0.3em;
            color: darkgray;
            font-size: 0.7em;
        }

    }

    textarea {
        @include remove(resize, outline);
        margin-top: 2%;
        border: 1px solid #eee;
        font-family: inherit;
    }

    textarea[disabled] {
        background-color: white;
        cursor: not-allowed;
    }

    .primary-button {
        align-self: flex-end;
        font-size: 0.8em;
        + .primary-button {
            margin-left: 5%;
        }
    }

    a {
        @include remove(text-decoration, outline);
        text-decoration: none;
        color: white;
        outline: none;
    }

    .danger-zone {
        box-sizing: border-box;

        h2 {
            @include centerRowData(flex-start);
            color: $darkred;

            .icon {
                margin-right: 0.3em;
            }
        }
    }

    .delete-container {
        @include centerRowData(space-between);
        margin-bottom: 0.5em;
        font-size: 0.9em;

        p {
            font-size: 1em;
            margin-bottom: 0;
        }

        .delete-button {
            width: 25%;
            font-size: 0.8em;
        }
    }
</style>