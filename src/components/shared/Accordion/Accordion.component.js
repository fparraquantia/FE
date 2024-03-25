import MuiAccordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function Accordion({title, children, isOpen, onChange, color, weight}) {
  let finalColor = color || "#a9d9d0";

  return (
    <MuiAccordion sx={{ backgroundColor: "transparent", boxShadow: "none" }} expanded={isOpen} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMore sx={{ color: finalColor }} />}>
        <Typography sx={{ fontSize: "0.938rem", color: finalColor, fontWeight: weight }}>
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{padding: "unset", paddingLeft: "1.5rem"}}>
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
}
