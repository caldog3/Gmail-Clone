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

    export default {
        props: {
            value: {
                type: String,
                default: ''
            }
        }, 

        data() {
            return {
                editor: null
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

            this.editor.root.innerHTML = this.value; // thought this would allow html to be seen within the editor

            this.editor.on('text-change', () => this.update());
        },

        methods: {
            update() {
                this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
            }
        }
    }
</script>