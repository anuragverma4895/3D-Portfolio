import { SectionWrapper } from '../../hoc';
import { technologies } from '../../constants';
import { styles } from '../../constants/styles';

const Tech = () => {
  return (
    <>
      <div className="flex flex-col items-center mb-10">
        <p className={styles.sectionSubText}>My skills</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map(technology => (
          <div
            className="h-28 w-28 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all"
            key={technology.name}
          >
            <img src={technology.icon} alt={technology.name} className="h-16 w-16 object-contain" />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, 'tech');
