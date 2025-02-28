export type IContent = {
    title: "",
    details: "",
    arabicText: "",
    ref: "",
    isShowing: false,
    status: "published | draft",
    category?: "duaOfTheDay" | "shukrInspiration" | "positiveThinking" | "jazakallahulKhair" | "shukrPosts" | "whatNew",
    publishDate: string,
    image?: string

  };

  export type HomeContentResponse = {
    data: {
      data: IContent[];
      message: string;
      success: boolean;
    };
  };