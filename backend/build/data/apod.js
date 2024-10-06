"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageLib = exports.apod_list = void 0;
exports.apod_list = [
    {
        copyright: "copyright0",
        date: "2023-12-01",
        explanation: "explanation0",
        hdurl: "hdurl0",
        media_type: "media_type0",
        service_version: "service_version0",
        title: "title0",
        url: "url0",
    },
    {
        copyright: "copyright1",
        date: "2023-12-02",
        explanation: "explanation1",
        hdurl: "hdurl1",
        media_type: "media_type1",
        service_version: "service_version1",
        title: "title1",
        url: "url1",
    },
];
exports.imageLib = {
    collection: {
        version: "1.0",
        href: "http://images-api.nasa.gov/search?q=apollo&media_type=video&page=2&page_size=5",
        items: [
            {
                href: "https://images-assets.nasa.gov/video/Apollo 11 Landing Profile/collection.json",
                data: [
                    {
                        album: [],
                        center: "HQ",
                        title: "Apollo 11 Landing Profile",
                        photographer: "",
                        keywords: [
                            "Apollo 11",
                            "Moon",
                            "LRO",
                            "Lunar Reconnaissance Orbiter",
                        ],
                        location: "",
                        nasa_id: "Apollo 11 Landing Profile",
                        media_type: "video",
                        date_created: "2013-05-17T00:00:00Z",
                        description: "The approach and landing of Apollo 11 has been reconstructed using data from NASA's Lunar Reconnaissance Orbiter. Video Courtesy of GoneToPlaid.",
                    },
                ],
                links: [
                    {
                        href: "https://images-assets.nasa.gov/video/Apollo 11 Landing Profile/Apollo 11 Landing Profile~thumb.jpg",
                        rel: "preview",
                        render: "image",
                    },
                    {
                        href: "https://images-assets.nasa.gov/video/Apollo 11 Landing Profile/Apollo 11 Landing Profile.srt",
                        rel: "captions",
                    },
                ],
            },
        ],
        metadata: {
            total_hits: 307,
        },
        links: [
            {
                rel: "prev",
                prompt: "Previous",
                href: "http://images-api.nasa.gov/search?q=apollo&media_type=video&page=1&page_size=5",
            },
            {
                rel: "next",
                prompt: "Next",
                href: "http://images-api.nasa.gov/search?q=apollo&media_type=video&page=3&page_size=5",
            },
        ],
    },
};
