import Footer from "@/components/Footer";
import { NextPage } from "next";
import React from "react";

const TalkDetails: NextPage = () => {
    return (
        <div>
            <div className="container mx-auto text-black">
                <div className="film-Details-title flex justify-center font-bold text-center py-8">
                    <h2 className="text-4xl font-bold border-title w-1/6">Talk Details</h2>
                </div>
                <div className="w-full">
                    <iframe width="100%" height="500" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </div>
                <div className="details py-5">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In inventore velit magni? Similique, veritatis! Aut earum, tenetur fugiat autem doloribus nam repudiandae, laboriosam, molestiae esse dolore doloremque sapiente ut! Error explicabo labore quia reiciendis obcaecati, hic quo quisquam animi vitae beatae necessitatibus delectus nisi nulla numquam aliquam cumque repellat? Laborum eius cupiditate quis, laboriosam aspernatur quae ratione mollitia dolor unde suscipit eligendi, culpa nobis repudiandae officiis corrupti distinctio alias, excepturi error dolore porro quam? Sint, magni consectetur optio, natus architecto, eius possimus enim nesciunt assumenda voluptatem excepturi. Praesentium eaque qui excepturi saepe impedit beatae omnis voluptate sapiente minus, est, ipsam vero quaerat eos a, fuga molestiae vitae ad explicabo repellat? Odit sit saepe magni quasi voluptate modi tempora quia dolores rerum? Harum fugit error voluptate dicta perferendis. Possimus est tempore optio libero nostrum voluptatum doloribus consequatur, ipsa, eum et quidem, inventore asperiores perferendis recusandae ipsum dolor facilis. Iure sequi consectetur quaerat temporibus inventore reprehenderit, eaque porro tempore id sit minima corrupti tenetur, neque reiciendis deserunt dolorem, minus iusto nostrum sed expedita perferendis. Ipsam at eligendi accusantium. Alias sunt ex quaerat, omnis ad, doloribus perferendis deleniti officia culpa, architecto placeat. Cupiditate optio officiis enim impedit repudiandae eos amet tenetur ea nemo?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In inventore velit magni? Similique, veritatis! Aut earum, tenetur fugiat autem doloribus nam repudiandae, laboriosam, molestiae esse dolore doloremque sapiente ut! Error explicabo labore quia reiciendis obcaecati, hic quo quisquam animi vitae beatae necessitatibus delectus nisi nulla numquam aliquam cumque repellat? Laborum eius cupiditate quis, laboriosam aspernatur quae ratione mollitia dolor unde suscipit eligendi, culpa nobis repudiandae officiis corrupti distinctio alias, excepturi error dolore porro quam? Sint, magni consectetur optio, natus architecto, eius possimus enim nesciunt assumenda voluptatem excepturi. Praesentium eaque qui excepturi saepe impedit beatae omnis voluptate sapiente minus, est, ipsam vero quaerat eos a, fuga molestiae vitae ad explicabo repellat? Odit sit saepe magni quasi voluptate modi tempora quia dolores rerum? Harum fugit error voluptate dicta perferendis. Possimus est tempore optio libero nostrum voluptatum doloribus consequatur, ipsa, eum et quidem, inventore asperiores perferendis recusandae ipsum dolor facilis. Iure sequi consectetur quaerat temporibus inventore reprehenderit, eaque porro tempore id sit minima corrupti tenetur, neque reiciendis deserunt dolorem, minus iusto nostrum sed expedita perferendis. Ipsam at eligendi accusantium. Alias sunt ex quaerat, omnis ad, doloribus perferendis deleniti officia culpa, architecto placeat. Cupiditate optio officiis enim impedit repudiandae eos amet tenetur ea nemo?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In inventore velit magni? Similique, veritatis! Aut earum, tenetur fugiat autem doloribus nam repudiandae, laboriosam, molestiae esse dolore doloremque sapiente ut! Error explicabo labore quia reiciendis obcaecati, hic quo quisquam animi vitae beatae necessitatibus delectus nisi nulla numquam aliquam cumque repellat? Laborum eius cupiditate quis, laboriosam aspernatur quae ratione mollitia dolor unde suscipit eligendi, culpa nobis repudiandae officiis corrupti distinctio alias, excepturi error dolore porro quam? Sint, magni consectetur optio, natus architecto, eius possimus enim nesciunt assumenda voluptatem excepturi. Praesentium eaque qui excepturi saepe impedit beatae omnis voluptate sapiente minus, est, ipsam vero quaerat eos a, fuga molestiae vitae ad explicabo repellat? Odit sit saepe magni quasi voluptate modi tempora quia dolores rerum? Harum fugit error voluptate dicta perferendis. Possimus est tempore optio libero nostrum voluptatum doloribus consequatur, ipsa, eum et quidem, inventore asperiores perferendis recusandae ipsum dolor facilis. Iure sequi consectetur quaerat temporibus inventore reprehenderit, eaque porro tempore id sit minima corrupti tenetur, neque reiciendis deserunt dolorem, minus iusto nostrum sed expedita perferendis. Ipsam at eligendi accusantium. Alias sunt ex quaerat, omnis ad, doloribus perferendis deleniti officia culpa, architecto placeat. Cupiditate optio officiis enim impedit repudiandae eos amet tenetur ea nemo?
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 flex flex-col items-center justify-end w-full px-2 py-5 text-center z-10 mx-auto">
                <Footer />
            </div>
        </div>
    );
};

export default TalkDetails;
