<template>
    <div class="task-card" :class="{
                done: isCompleted,
                todo: !isCompleted,
                isLate: isLate,
                isDeleted: isDeleted
     }">
        <button @click="changeRoute($event)">
            <span>
                <CheckCircleIcon v-if="isCompleted"
                                 class="icon"/>
                <AlertOctagonIcon v-else-if="isLate" class="icon"/>
                <InfoIcon v-else class="icon"/>
            </span>
        </button>
        <div class="task-data">
            <h1>{{name}}</h1>
            <p>{{description}}</p>
            <div v-if="date">{{displayedDate}}</div>
            <div v-else>Date undefined</div>
        </div>
    </div>
</template>

<script>
    import {CheckCircleIcon, InfoIcon, AlertOctagonIcon} from 'vue-feather-icons'
    import {dateController} from "../../services/date-transformations";

    export default {
        name: 'TaskCard',

        components: {
            CheckCircleIcon,
            InfoIcon,
            AlertOctagonIcon,
        },

        props: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            description: {
                type: String
            },
            date: {
                type: String
            },
            isCompleted: {
                //type: Boolean
            },
            isDeleted: {}
        },
        methods: {
            changeRoute(event) {
                /*:to="{name: 'TaskInfo',  params: {taskId: id} }"*/
                this.$emit('changeRoute', this.id)
            }
        },

        computed: {
            displayedDate() {
                return dateController.toString(new Date(this.date))
            },
            isLate() {
                if (this.date) {
                    const yesterday = new Date()
                    yesterday.setDate(yesterday.getDate() - 1)
                    return new Date(this.date) < yesterday
                } else {
                    return false
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    @import '../styles/main.scss';

    $ochre: #F5C52C;
    $green: #32CD32;
    $gray: #eee;

    .task-card {
        display: flex;
        background-color: #fff;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
    }

    button {
        @include centerRowData(center);
        width: 20%;
        padding: 1.5em;
        border: none;
        outline: none;
        cursor: pointer;
    }

    // In this ordering.
    .isDeleted {
        @include taskStatus($gray);
        pointer-events: none;
        border: 2px solid orange;
    }

    .todo {
        @include taskStatus($ochre);
    }

    .isLate {
        @include taskStatus($darkred);
    }

    .done {
        @include taskStatus($green);
    }

    .isDeleted {
        pointer-events: none;
        opacity: 0.4;
    }

    .icon {
        color: #fff;
        width: 1.3em;
    }

    .task-data {
        @extend %flexColumn;
        width: 90%;
        padding: 0.5em;
        font-size: inherit;
        font-family: inherit;
        overflow: hidden;

        p {
            display: inline-block;
            @include handleOverflow();
        }

        :not(:last-child) {
            padding-bottom: 1em;
        }

        :last-child {
            align-self: flex-end;
            font-size: 0.8em;
        }
    }

    h1 {
        font-size: 1.2em;
    }

    p {
        font-size: 0.8em;
    }

    h1, p {
        margin: 0;
    }


</style>