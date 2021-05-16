<template>
    <div class="row pb-3">
        <div class="col">
            <div class="form-inline">
                <input v-model="text"
                       :placeholder="formPlaceholder"
                       class="form-control mr-1">
                <b-button
                    variant="primary"
                    v-on:click="returnText"
                >
                    <b-spinner
                        v-if="loading"
                        variant="white"
                        small label="Small Spinner my-auto"
                    >&nbsp;</b-spinner>
                    {{ buttonText }}
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'textInput',
    props: ['loading', 'formPlaceholder', 'buttonText'],
    data() {
        return {
            text: null,
        };
    },
    methods: {
        returnText() {
            this.$emit('text', this.text);
        },
    },
};
</script>

<style scoped>

</style>
