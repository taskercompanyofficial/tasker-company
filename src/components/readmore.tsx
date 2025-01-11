import { useState } from "react";

const ReadMore: React.FC<{ text: string }> = ({ text }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <p className="text">
            {isReadMore ? text.slice(0, 50) : text}
            {text.length > 50 && (
                <span
                    onClick={toggleReadMore}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                >
                    {isReadMore ? "...read more" : " show less"}
                </span>
            )}
        </p>
    );
};

export default ReadMore;