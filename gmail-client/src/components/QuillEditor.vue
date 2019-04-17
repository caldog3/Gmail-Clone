<template>
    <div>
        <div ref="editor"></div>
    </div>
</template>

<style scoped>
    div {
        min-height: 250px;
    }
</style>

<script>
    import Quill from 'quill';
    import eventBus from '../event_bus';


    export default {
        props: {
            value: {
                type: String,
                default: '',
                //custom props
            },
        }, 

        data() {
            return {
                editor: null,
                draftValue: "",
            };
        },
        mounted() {
            this.editor = new Quill(this.$refs.editor, {
                modules: {
                    toolbar: [
                        [{ 'font': [] }],
                        [{ 'header': 1 }, { 'header': 2 }, { header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }, { 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                        ['image', 'code-block', 'link'],
                        [{ 'direction': 'rtl' }],   
                    ]
                },
                theme: 'snow',
            });
            console.log("IN MOUNTED", this.value);
            //this.editor.root.innerHTML = this.value;
            this.editor.root.innerHTML = this.$store.state.draftMessage;

            this.editor.on('text-change', () => this.update()); //something resets the value in here somewhere
        },

        methods: {
            update() { //don't set values in here...they get called every keystroke by the user
                var text = this.editor.getText();
                //this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
                this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : this.$store.state.draftMessage);
            },
        },
        created() { //for the eventBus to emit here
            // eventBus.$on('COMPOSE_OPEN_DRAFT', payload => { // this $on is created AFTER the $emit happens so it isn't read until the second time /// NEED PROPS
            //     //do some stuff here
            //     console.log("created payload: ", payload);
            //     //this.draftValue = payload.body;
            //     this.draftValue = "SOMETHING";
            //     this.otherVal = "LINGERING?";
            // });
        },
    }
</script>