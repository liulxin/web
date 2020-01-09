module.exports = {
  title: 'liulixin',
  description: 'This is a blog example built by VuePress',
  theme: 'vuepress-theme-liuli',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
    nav: [
      {
        text: 'Blog',
        link: '/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
      {
        text: 'Github',
        link: 'https://github.com/liulxin/vuepress-theme-liuli',
      },
    ],
    footer: {
      contact: [
        {
          type: 'codepen',
          link: '#',
        },
      ],
      copyright: [
        {
          text: 'liulixin',
          link: 'https://github.com/liulxin/vuepress-theme-liuli',
        },
        {
          text: 'MIT Licensed | Copyright Â© 2020-present Vue.js',
          link: '',
        },
      ],
    },

    modifyBlogPluginOptions(blogPluginOptions) {
      const sitemap = {
        hostname: 'https://yourdomain',
      }

      const comment = {
        service: 'disqus',
        shortname: 'vuepress-plugin-blog',
        // service: 'vssue',
        // owner: 'You',
        // repo: 'Your repo',
        // clientId: 'Your clientId',
        // clientSecret: 'Your clientSecret',
      }

      const newsletter = {
        endpoint:
          'https://billyyyyy3320.us4.list-manage.com/subscribe/post?u=4905113ee00d8210c2004e038&amp;id=bd18d40138',
      }

      return { ...blogPluginOptions, sitemap, comment }
    },

    // paginationComponent: 'SimplePagination'
  },
}
