import { useState } from "react";

interface ReadMoreProps {
    text: string | undefined | null;
    maxLength?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength = 50 }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => setIsReadMore(!isReadMore);

    if (!text) {
        return null;
    }

    return (
        <p className="text">
            {isReadMore ? text.slice(0, maxLength) : text}
            {text.length > maxLength && (
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