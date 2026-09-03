import { useState } from 'react';
import {
	Avatar,
	Box,
	ButtonBase,
	Divider,
	Stack,
	Typography,
} from '@mui/material';

const menuItems = [
	{ label: 'Dashboard', icon: '▦' },
	{ label: 'GIS Map', icon: '⌖' },
	{ label: 'Statutory Workflow', icon: '☷' },
	{ label: 'Compensation Calc', icon: '₹' },
	{ label: 'Documents', icon: '▤' },
	{ label: 'Landowner Portal', icon: '♙' },
	{ label: 'Smart Alerts', icon: '◈' },
	{ label: 'AI Decision Support', icon: '✦' },
];

function Sidebar({ activeItem = 'Dashboard', onNavigate }) {
	const [selectedItem, setSelectedItem] = useState(activeItem);

	const handleNavigation = (label) => {
		setSelectedItem(label);
		onNavigate?.(label);
	};

	return (
		<Box
			component="aside"
			sx={{
				width: 272,
				minHeight: '100vh',
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				bgcolor: '#102A43',
				color: '#F7FAFC',
				px: 2,
				py: 2.5,
			}}
		>
			<Stack direction="row" spacing={1.25} alignItems="center" sx={{ px: 1, mb: 4 }}>
				<Box
					sx={{
						width: 38,
						height: 38,
						display: 'grid',
						placeItems: 'center',
						borderRadius: 1.5,
						bgcolor: '#2CB67D',
						color: '#102A43',
						fontSize: 22,
						fontWeight: 800,
					}}
				>
					B
				</Box>
				<Box>
					<Typography sx={{ fontSize: 17, fontWeight: 800, lineHeight: 1.1 }}>
						Bhumi Setu
					</Typography>
					<Typography sx={{ color: '#9FB3C8', fontSize: 11, letterSpacing: 0.8 }}>
						LAND ACQUISITION HUB
					</Typography>
				</Box>
			</Stack>

			<Typography
				sx={{ px: 1, mb: 1, color: '#829AB1', fontSize: 10, fontWeight: 700, letterSpacing: 1.3 }}
			>
				WORKSPACE
			</Typography>
			<Stack component="nav" aria-label="Main navigation" spacing={0.5}>
				{menuItems.map(({ label, icon }) => {
					const isActive = selectedItem === label;

					return (
						<ButtonBase
							key={label}
							onClick={() => handleNavigation(label)}
							aria-current={isActive ? 'page' : undefined}
							sx={{
								minHeight: 46,
								justifyContent: 'flex-start',
								borderRadius: 1.5,
								px: 1.25,
								color: isActive ? '#102A43' : '#D9E2EC',
								bgcolor: isActive ? '#F0B429' : 'transparent',
								'&:hover': { bgcolor: isActive ? '#F0B429' : '#1C3D5A' },
								'&:focus-visible': { outline: '2px solid #F0B429', outlineOffset: 2 },
							}}
						>
							<Box component="span" aria-hidden="true" sx={{ width: 30, fontSize: 21, lineHeight: 1 }}>
								{icon}
							</Box>
							<Typography sx={{ fontSize: 13.5, fontWeight: isActive ? 700 : 500 }}>
								{label}
							</Typography>
						</ButtonBase>
					);
				})}
			</Stack>

			<Box sx={{ flexGrow: 1 }} />
			<Divider sx={{ borderColor: '#234E70', mb: 2 }} />
			<ButtonBase
				sx={{
					width: '100%',
					justifyContent: 'flex-start',
					borderRadius: 1.5,
					px: 1,
					py: 1,
					color: '#F7FAFC',
					'&:hover': { bgcolor: '#1C3D5A' },
					'&:focus-visible': { outline: '2px solid #F0B429', outlineOffset: 2 },
				}}
			>
				<Avatar sx={{ width: 38, height: 38, mr: 1.25, bgcolor: '#D64545', fontSize: 14 }}>
					AS
				</Avatar>
				<Box sx={{ textAlign: 'left', minWidth: 0 }}>
					<Typography noWrap sx={{ fontSize: 13.5, fontWeight: 700 }}>
						Ananya Sharma
					</Typography>
					<Typography noWrap sx={{ color: '#9FB3C8', fontSize: 11.5 }}>
						Project Administrator
					</Typography>
				</Box>
				<Typography aria-hidden="true" sx={{ ml: 'auto', color: '#829AB1', fontSize: 20 }}>
					⋮
				</Typography>
			</ButtonBase>
		</Box>
	);
}

export default Sidebar;
