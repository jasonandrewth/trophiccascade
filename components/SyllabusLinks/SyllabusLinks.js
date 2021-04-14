//components
import SyllabusLink from "../SyllabusLink/SyllabusLink";

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