interface Guide {
    guideDetails: string;
    guideImageUrl: string;
    guideVideoUrl: string;
    _id: string;
  }
  
  export interface Template {
    [x: string]: any;
    _id: string;
    title: string;
    templateImageUrl: string;
    templateDetails: string;
    templateGuide: Guide[];
    category: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  }