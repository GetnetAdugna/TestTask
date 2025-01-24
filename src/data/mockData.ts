import { Post, User } from "../types";

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alemayehu Bekele",
    username: "alemayehu",
    avatar:
      "https://cdn.pixabay.com/photo/2019/03/29/11/41/ethiopia-4089002_1280.jpg",
    bio: "Software Engineer | Coffee Lover | Code Artist",
  },
  {
    id: "2",
    name: "Muluwork Abebe",
    username: "muluwork",
    avatar:
      "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
    bio: "Digital Creator | Photography",
  },
  {
    id: "3",
    name: "Kebede Tadesse",
    username: "kebede",
    avatar:
      "https://cdn.pixabay.com/photo/2017/09/29/02/12/coffee-2797638_1280.jpg",
    bio: "Tech Enthusiast | Gamer",
  },
  {
    id: "4",
    name: "Tigist Mekonnen",
    username: "tigist",
    avatar:
      "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
    bio: "Travel | Photography | Life",
  },
];

const mockPosts: Post[] = [
  {
    id: "1",
    content: "Check out these amazing shots from my weekend trip! 📸",
    images: [
      "https://cdn.pixabay.com/photo/2017/02/01/11/15/abyssinia-2029719_1280.png",
      "https://media.istockphoto.com/id/2160601825/photo/portrait-of-old-man-from-erbore-tribe-ethiopia-africa.jpg?s=612x612&w=is&k=20&c=lpkhwA4G9SKZeCrh6xN_COj7QUIoNdQ2uhLF1UDoNlM=",
      "https://cdn.pixabay.com/photo/2019/03/29/11/41/ethiopia-4089002_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/09/29/02/12/coffee-2797638_1280.jpg",
    ],
    author: mockUsers[0],
    createdAt: new Date("2024-03-20T10:00:00"),
    likes: 42,
    isLiked: false,
    isBookmarked: false,
    comments: [
      {
        id: "1",
        content: "This looks amazing! Great work! 👏",
        author: mockUsers[1],
        createdAt: new Date("2024-03-20T10:30:00"),
        parentId: null,
        replies: [],
        likes: 5,
      },
    ],
  },
  {
    id: "2",
    content: "እንኳን ደህና መጣችሁ! እንዴት ነው እሁኑ?",
    author: mockUsers[0],
    createdAt: new Date("2024-03-15T08:00:00"),
    likes: 120,
    isLiked: false,
    isBookmarked: false,
    comments: [],
  },
  {
    id: "3",
    content: "Check out this amazing view from my morning hike! 🏔️",
    image:
      "https://cdn.pixabay.com/photo/2017/09/29/02/12/coffee-2797638_1280.jpg",
    author: mockUsers[2],
    createdAt: new Date("2024-03-18"),
    likes: 84,
    isLiked: false,
    isBookmarked: false,
    comments: [],
  },
  {
    id: "4",
    content: "My workspace setup is finally complete! 💻✨",
    image:
      "https://cdn.pixabay.com/photo/2017/09/29/02/12/coffee-2797638_1280.jpg",
    author: mockUsers[3],
    createdAt: new Date("2024-03-17"),
    likes: 156,
    isLiked: false,
    isBookmarked: false,
    comments: [],
  },
  {
    id: "5",
    content: "አስደናቂ የአምስት አስተያየት ስራዎች እንዴት እንደሚሰሩ!",
    author: mockUsers[1],
    createdAt: new Date("2024-03-14T09:00:00"),
    likes: 95,
    isLiked: false,
    isBookmarked: false,
    comments: [],
  },
];

export { mockUsers, mockPosts };
