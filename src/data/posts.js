const posts = [
    // {
    //     type: "video",
    //     name: 'Mayra Sibley',
    //     date: '10 minutes ago',
    //     profilePic: '/assets/img/profile-pic-l.jpg',
    //     detail: 'Keeping your eye on the ball while performing a deep dive on the start-up mentality.',
    //     image: "/assets/img/subpage-video-poster.jpg",
    //     video: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4",
    //     comments: [{
    //         name: 'Kathryn Mengel',
    //         detail: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallis enim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, eget auctor sapien varius.',
    //         date: 'Two hours ago',
    //         thumb: '/assets/img/profile-pic-l-3.jpg',
    //         likes: 1,
    //         key: 1
    //     },
    //     {
    //         name: 'Philip Nelms',
    //         detail: 'Quisque consectetur lectus eros, sed sodales libero ornare cursus. Etiam elementum ut dolor eget hendrerit. Suspendisse eu lacus eu eros lacinia feugiat sit amet non purus.',
    //         date: 'Two hours ago',
    //         thumb: '/assets/img/profile-pic-l-4.jpg',
    //         likes: 5,
    //         key: 2
    //     }],
    //     key: 1
    // },
    // {
    //     type: "image",
    //     name: 'Mayra Sibley',
    //     date: '2 hours ago',
    //     profilePic: '/assets/img/profile-pic-l.jpg',
    //     detail: 'Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality.',
    //     image: "/assets/img/detail-5.jpg",
    //     video: "",
    //     comments: [{
    //         name: 'Latarsha Gama',
    //         detail: 'Taking seamless key performance indicators offline to maximise the long tail.',
    //         date: 'Five days ago',
    //         thumb: '/assets/img/profile-pic-l-7.jpg',
    //         likes: 0,
    //         key: 4
    //     }],
    //     key: 2
    // },
    {
        type: "text",
        name: 'Samrat Kar',
        date: '2 hours ago',
        profilePic: 'https://scontent.fdel30-1.fna.fbcdn.net/v/t1.0-9/16387203_1387337727973966_8587429402607515869_n.jpg?_nc_cat=110&_nc_oc=AQmdg8peq_Mj5iqPihRwVMtiL7n5Mr1fPBoqgBwRy03vJciObe2vZEXdAQ3oY3Tv9A8&_nc_ht=scontent.fdel30-1.fna&oh=f1f0fc9aba92ff33399e5296aec833c1&oe=5E2DC87F',
        detail: "Siddhartha's essay doesn't answer the core question. Learnings and unlearnings don't add up to make a story",
        image: "",
        video: "",
        comments: [],
        key: 1
    },
    {
        type: "text",
        name: 'Samrat Kar',
        date: '3 hours ago',
        profilePic: 'https://scontent.fdel30-1.fna.fbcdn.net/v/t1.0-9/16387203_1387337727973966_8587429402607515869_n.jpg?_nc_cat=110&_nc_oc=AQmdg8peq_Mj5iqPihRwVMtiL7n5Mr1fPBoqgBwRy03vJciObe2vZEXdAQ3oY3Tv9A8&_nc_ht=scontent.fdel30-1.fna&oh=f1f0fc9aba92ff33399e5296aec833c1&oe=5E2DC87F',
        detail: "Unlearning pointa are weak. Need work",
        image: "",
        video: "",
        comments: [],
        key: 2
    },
    {
        type: "text",
        name: 'Samrat Kar',
        date: '5 hours ago',
        profilePic: 'https://scontent.fdel30-1.fna.fbcdn.net/v/t1.0-9/16387203_1387337727973966_8587429402607515869_n.jpg?_nc_cat=110&_nc_oc=AQmdg8peq_Mj5iqPihRwVMtiL7n5Mr1fPBoqgBwRy03vJciObe2vZEXdAQ3oY3Tv9A8&_nc_ht=scontent.fdel30-1.fna&oh=f1f0fc9aba92ff33399e5296aec833c1&oe=5E2DC87F',
        detail: "Why ISB is unclear in the mock interview. Focus needs to be shifted towards short term, medium term and long term goals after ISB",
        image: "",
        video: "",
        comments: [],
        key: 3
    },
    {
        type: "text",
        name: 'Priya Gupta',
        date: '6 hours ago',
        profilePic: 'https://media.licdn.com/dms/image/C5603AQFaKM2SVpVwaA/profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&t=EQMdSyopWPZflfalqOobOVmWJcyUp2VLVgIUdc4qK_c',
        detail: "The learning and unlearning points are strengths and weaknesses really. Major rework require in the story",
        image: "",
        video: "",
        comments: [],
        key: 4
    },
    // {
    //     type: "text",
    //     name: 'Mayra Sibley',
    //     date: '3 hours ago',
    //     profilePic: '/assets/img/profile-pic-l.jpg',
    //     detail: 'Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality.',
    //     image: "",
    //     video: "",
    //     comments: [],
    //     key: 3
    // },
    // {
    //     type: "image",
    //     name: 'Mayra Sibley',
    //     date: 'A day ago',
    //     profilePic: '/assets/img/profile-pic-l.jpg',
    //     detail: 'Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality.',
    //     image: "/assets/img/detail-1.jpg",
    //     video: "",
    //     comments: [{
    //         name: 'Latarsha Gama',
    //         detail: 'Taking seamless key performance indicators offline to maximise the long tail.',
    //         date: 'Five days ago',
    //         thumb: '/assets/img/profile-pic-l-7.jpg',
    //         likes: 0,
    //         key: 4
    //     },
    //     {
    //         name: 'Laree Munsch',
    //         detail: 'Quisque consectetur lectus eros, sed sodales libero ornare cursus. Etiam elementum ut dolor eget hendrerit. Suspendisse eu lacus eu eros lacinia feugiat sit amet non purus.',
    //         date: 'Six days ago',
    //         thumb: '/assets/img/profile-pic-l-2.jpg',
    //         likes: 14,
    //         key: 5
    //     }],
    //     key: 4
    // }
]

export default posts
