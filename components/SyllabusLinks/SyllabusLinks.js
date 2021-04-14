//components
import SyllabusLink from "../SyllabusLink/syllabusLink";

const SyllabusLinks = ({ links }) => {

  return (
    <div>
      
      {links.map(link => {
      
        return (
        <SyllabusLink
          link={link}
          key={link.id}
        >
        </SyllabusLink>
        )
      })
      }
    </div>
  );
};

export default SyllabusLinks;
