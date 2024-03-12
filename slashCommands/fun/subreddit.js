
  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const request = require("request");

module.exports = {
  name: 'subreddit',
  description: "Get a random post from a Subreddit",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
    options: [
    {
       name: 'sub',
       description: 'Pick a subreddit',
       type: 3,
       required: true,
       choices: [
          {
              name: 'r/memes',
              value: 'memes',
          },
          {
              name: 'r/wholesomememes',
              value: 'wholesomememes',
          },
          {
              name: 'r/oddlysatisfying',
              value: 'oddlysatisfying',
          },
          {
              name: 'r/mildlyinteresting',
              value: 'mildlyinteresting',
          },
         {
              name: 'r/MadeMeSmile',
              value: 'MadeMeSmile',
          },
         {
              name: 'r/forbiddensnacks',
              value: 'forbiddensnacks',
          },
         {
              name: 'r/dogpictures',
              value: 'dogpictures',
          },
         {
              name: 'r/catpics',
              value: 'catpics',
          },
         {
              name: 'r/BirdPhotography',
              value: 'BirdPhotography',
          },
         {
              name: 'r/aww',
              value: 'aww',
          },
         {
              name: 'r/creepypasta',
              value: 'creepypasta',
          }
       ]
    }
  ],


  run: async (client, interaction) => {
    await interaction.deferReply();
        const config = client.config
        const color = config.color.HEX
 // const iconURL = request({
//       uri: "https://www.reddit.com/r/" + sub + "/about.json", // URL
//       json: true
//     }, (error, response, body, json) => {
//       if (error) throw new Error(error);
// 
//   const {data} = response.data
//       url = data.community_icon
//   })

    function truncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

    let options = interaction.options
    let [hoptions] = options._hoistedOptions
    const sub = hoptions.value

    request({
      uri: "https://www.reddit.com/r/" + sub + "/random/.json", // URL
      json: true
    }, (error, response, body, json) => {
      if (error) throw new Error(error);

      const [list] = response.body;
      const [post] = list.data.children;
      const permalink = post.data.permalink;
      const postUrl = `https://reddit.com${permalink}`;
      const postImage = post.data.url;
      const postTitle = post.data.title;
      const postUpvotes = post.data.ups;
      const postNumComments = post.data.num_comments;
      const postAuthor = post.data.author;
      const postDesc = post.data.selftext;
    

      const embed = new EmbedBuilder()
        .setTitle(`${postTitle}`)
        .setAuthor({ name: `u/${postAuthor}`})
     //   .setThumbnail(iconURL)
       
        .setColor(color)

      if (isValidImageURL(postImage)) {
        embed.setImage(postImage);
      }
      if (postDesc !== "") {
        embed.setDescription(`${truncate(postDesc, 252, "…")}`)
      }
      function isValidImageURL(str) {
        if (typeof str !== 'string') return false;
        return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
      }

     embed.setFooter({ text: `👍 ${postUpvotes} 💬 ${postNumComments} | ` + "Provided by r/" + sub});

      const actionRow = new ActionRowBuilder()
        .addComponents([
          new ButtonBuilder()
            .setLabel('Open Post')
            .setURL(postUrl)
            .setStyle(ButtonStyle.Link)
        ])
      return interaction.editReply({ embeds: [embed], components: [actionRow] })
    });
  }
};


