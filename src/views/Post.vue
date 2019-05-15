<template>
    <v-container>
        <v-layout row>
            <v-flex s12>
                <v-card>
                    <v-card-media
                    height="500px"
                    :src="post.img">
                    </v-card-media>
                    <v-card-text>
                        <h1>
                        {{ post.title }}
                        </h1><v-divider></v-divider>
                        <h3>{{ post.author }}</h3><span>{{ post.date }}</span>
                        </v-card-text>
                    <v-card-text>
                        <p>
                        {{ post.text }}
                        </p>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn class="primary" :to="'/'">Back</v-btn>
                        <v-btn class="accent" :to="'/newpost'">Edit</v-btn>
                    </v-card-action>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['author', 'id' ],
    computed: {
        post() {
            var id = this.id
            return this.$store.getters.postById(id)
        }
    }
    
}
</script>