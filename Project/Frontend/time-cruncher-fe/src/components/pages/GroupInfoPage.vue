<template>
    <div class="task-info">
        <form @submit.prevent="updateTask($event)">
            <h1>
                <input aria-label="title" placeholder="Task name"
                       v-model="group.name"
                       spellcheck="false"/>
            </h1>

            <h2>
                <AlignLeftIcon class="icon"/>
                Description
            </h2>
            <textarea placeholder="Description"
                      v-model="group.description"
                      rows="8"
                      spellcheck="false"
            />

            <div class="members">
                <h2>
                    <UsersIcon class="icon"/>
                    Members
                </h2>
                <span v-for="member in members" :key="member.id">
                {{member.firstname}} {{member.lastname}}
                 </span>
            </div>

            <button type="submit">Submit</button>
        </form>
        <p>Go to
            <router-link :to="{path: '/login'}" class="comments">
                comment section
            </router-link>
        </p>
    </div>
</template>

<script>
    import {AlignLeftIcon, UsersIcon} from 'vue-feather-icons'
    import Checkbox from '../ui/Checkbox'
    import * as global from "../../services/utilites";

    export default {
        name: 'GroupInfoPage',
        components: {
            AlignLeftIcon,
            UsersIcon,
            Checkbox
        },
        data() {
            return {
                group: this.loadLastActiveGroup(),
                members: []
            }
        },
        methods: {
            updateTask() {

            },

            loadLastActiveGroup: function () {
                return global.groupState.getLastActiveGroup()
            },

            initMembers: async function () {
                const groupId = this.$route.params.groupId
                const response = await fetch(process.env.VUE_APP_BE_URL + `/groups/${groupId}/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.ok) {
                    this.members = await response.json()
                }
            }
        },
        watch: {
            $route() {
                this.group = this.loadLastActiveGroup()
                this.initMembers()
            }
        },
        created() {
            this.initMembers()
        }
    }
</script>

<style scoped lang="scss">
    $lightblue: #80d0c7;
    $darkblue: #13547a;

    .task-info {
        height: 100vh;
        padding-left: 1em;
        padding-right: 1em;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-left: 2px solid #eee;
    }

    form {
        display: flex;
        flex-direction: column;
        background-color: #fff;

    }

    input, textarea {
        width: 100%;
        font-family: inherit;
        border: none;
        outline: none;
    }

    h1 {
        font-size: 1.4em;
        font-weight: bold;
    }

    .label-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1em;
    }

    input[type="date"] {
        width: 40%;
        font-family: inherit;
        outline: none;
        border: none;
    }

    input {
        font-size: 1.5em;
        font-weight: bold;
    }

    .date-container {
        font-size: 0.8em;
    }

    p {
        margin-top: 0;
        font-size: inherit;
    }

    // Due date container
    p + label {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        font-size: inherit;

        // Due date value
        > input {
            width: 70%;
            margin-left: 0.5em;
            font-size: inherit;
            font-weight: normal;
            font-size: 1em;
        }
    }

    textarea {
        resize: none;
    }

    .members {
        display: flex;
        flex-direction: column;
    }

    .members > span {
        /*border: 1px solid black;*/
        display: flex;
        align-items: center;
        font-size: 0.9em;
        margin-bottom: 0.5em;
    }

    // remove member button
    button {
        display: flex;
        align-items: center;
        background-color: white;
        border: none;
        outline: none;
    }

    h2 {
        display: flex;
        align-items: center;
        margin-top: 0.5em;
        font-size: 1.2em;
    }

    .label-checkbox {
        display: flex;
        margin-top: 1em;
        justify-content: center;
        align-self: flex-start;
    }

    .checkbox {
        margin-right: 0.8em;
    }

    .icon {
        padding-right: 0.5em;
        width: 1em;
    }

    button[type="submit"] {
        display: block;
        width: 30%;
        margin-top: 1em;
        padding: 1em;
        align-self: center;
        font-family: inherit;
        font-weight: bold;
        font-size: 0.92em;
        letter-spacing: 1px;
        text-align: center;
        text-transform: uppercase;
        color: white;
        border: none;
        outline: none;
        background: linear-gradient($lightblue, $darkblue);
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    form + p {
        /*border: 1px solid blue;*/
        width: 100%;
        margin-top: 2em;
        text-align: center;

        a {
            color: $darkblue;
            text-decoration: none;
        }
    }

</style>