<template>
    <carousel id="carousel">
        <slide>
            This quick introduction will show the various security features that are available for
            use in this email provider. Yadayadayada
        </slide>
        <slide>
            Part 1 Picture
            <img src="../assets/gmail.png" width="250">
        </slide>
        <slide>
            When sending a message you may use this feature.  "Set Expiring Message" allows you to
            designate how long from now you want the message to still be accessible.  Once that timer
            runs out, the message will expire, and no one (including yourself) will have access to the
            message's contents anymore.
        </slide>
        <slide>
            Message Expiry Picture
            <img src="../assets/gmail.png" width="250">
        </slide>
        <slide>
            Next to the line for entering the subject of the message chain is a dropdown menu with selections
            for other privacy settings.
        </slide>
        <slide>
            Picture
            <img src="../assets/gmail.png" width="250">
        </slide>
        <slide>
            Content
        </slide>
        <slide>
            Picture
            <img src="../assets/gmail.png" width="250">
        </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    name: "OnboardCarousel",
    data() {
        return {

        };
    },
    components: {
        Carousel,
        Slide,
    },
}
</script>

<style scoped>
    #carousel {
        cursor: pointer;
    }
</style>