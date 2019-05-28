/* eslint-disable */
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
                initialized: false,
            };
        },
        mounted() {
            /*testing this*/
            var Block = Quill.import('blots/block');
            var Inline = Quill.import('blots/inline');

            class LinkBlot extends Inline {
                static create(value) {  
                    let node = super.create();
                    if (value.href) { 
                    if (value.href !== '') { node.setAttribute('href', value.href) }
                    if (value.class !== '') { node.setAttribute('class', value.class) }
                    if (value.style !== '') { node.setAttribute('style', value.style) }
                    node.setAttribute('target', '_blank')
                    } else {
                    node.setAttribute('href', value)
                    node.setAttribute('target', '_blank')
                    }
                    return node;
                }
                static formats(node) {
                    return {
                    href: node.getAttribute('href') ? node.getAttribute('href') : '',
                    class: node.getAttribute('class') ? node.getAttribute('class') : '',
                    style: node.getAttribute('style') ? node.getAttribute('style') : ''
                    }
                }
            }
            LinkBlot.blotName = 'link';
            LinkBlot.tagName = 'a';
            Quill.register(LinkBlot);

            class ParagraphBlot extends Block {
                static create(value) {
                    let node = super.create();
                    if (value.class !== '') { node.setAttribute('class', value.class) }
                    if (value.style !== '') { node.setAttribute('style', value.style) }
                    return node
                }
                static formats(node) {
                    if (node) {
                        return {
                            class: node.getAttribute('class') ? node.getAttribute('class') : '',
                            style: node.getAttribute('style') ? node.getAttribute('style') : ''
                        }
                    }
                }
            }
            ParagraphBlot.blotName = 'p';
            ParagraphBlot.tagName = 'p';
            Quill.register(ParagraphBlot);

            class DivBlot extends Block {
                static create(value) {
                    let node = super.create();
                    if (value.class !== '') { node.setAttribute('class', value.class) }
                    if (value.style !== '') { node.setAttribute('style', value.style) }
                    return node
                }
                static formats(node) {
                    if (node) {
                        return {
                            class: node.getAttribute('class') ? node.getAttribute('class') : '',
                            style: node.getAttribute('style') ? node.getAttribute('style') : ''
                        }
                    }
                }
            }
            DivBlot.blotName = 'div';
            DivBlot.tagName = 'div';
            Quill.register(DivBlot);
            // Block.tagName = 'div';
            // Quill.register(Block);
            /*end testing this*/
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
            // console.log("IN MOUNTED", this.value);
            //this.editor.root.innerHTML = this.value;
            this.editor.root.innerHTML = this.$store.state.draftMessage;


            this.editor.on('text-change', () => this.update()); //something resets the value in here somewhere
        },

        methods: {
            update() { //don't set values in here...they get called every keystroke by the user
                var text = this.editor.getText();
                // console.log("Initialization status: ", this.initialized);
                if (!this.initialized) {
                    this.editor.root.innerHTML = this.value;
                    // console.log("IN THE IF: ", this.value);
                    // console.log("IF innerHTML: ", this.editor.root.innerHTML);
                    this.initialized = true;
                    // this.editor.root.innerHTML = "TETSING";
                }
                // this.editor.root.innerHTML = this.value;
                //this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
                this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : this.$store.state.draftMessage);
            },
        },
        destroyed() {
            this.initialized = false;
        }
    }
</script>