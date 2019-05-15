<template>
    <v-container>
        <v-layout row>
            <v-flex s12>
                <v-card>
                    <v-card-media
                    height="500px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                    </v-card-media>
                    <v-card-text>
                        <h1>
                        Title
                        </h1><v-divider></v-divider>
                        <h3>Roma</h3><span>10.12.1900</span>
                        </v-card-text>
                    <v-card-text>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis provident quia quis molestiae eaque officia, ea sit quibusdam voluptatem porro?
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
    
}
</script>